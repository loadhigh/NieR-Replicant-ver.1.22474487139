#define WIN32_LEAN_AND_MEAN

#include <cstddef>
#include <optional>
#include <string>
#include <array>
#include <Windows.h>
#include <TlHelp32.h>

export module Memory;

using namespace std;

export class Memory
{
private:
	uintptr_t process_id;
	uintptr_t baseAddress;
	size_t baseSize;

	std::wstring process_name;

	bool get_process_id()
	{
		PROCESSENTRY32W process_entry;
		process_entry.dwSize = sizeof(process_entry);

		HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, NULL);

		if (snapshot == INVALID_HANDLE_VALUE)
			return false;

		if (Process32FirstW(snapshot, &process_entry))
		{
			do
			{
				std::wstring process_name_cmp = process_entry.szExeFile;
				if (process_name_cmp.find(process_name) != std::wstring::npos)
				{
					process_id = process_entry.th32ProcessID;
					break;
				}
			}
			while (Process32NextW(snapshot, &process_entry));
		}

		CloseHandle(snapshot);

		if (process_id)
			return true;

		return false;
	}


	bool get_module_base()
	{
		MODULEENTRY32W module_entry;
		module_entry.dwSize = sizeof(module_entry);

		HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPMODULE, static_cast<DWORD>(process_id));

		if (snapshot == INVALID_HANDLE_VALUE)
			return false;

		if (Module32FirstW(snapshot, &module_entry))
		{
			do
			{
				std::wstring module_name_cmp = module_entry.szModule;
				if (module_name_cmp.find(process_name) != std::wstring::npos)
				{
					if (module_entry.modBaseAddr && module_entry.modBaseSize)
					{
						CloseHandle(snapshot);
						baseAddress = reinterpret_cast<uintptr_t>(module_entry.modBaseAddr);
						baseSize = static_cast<size_t>(module_entry.modBaseSize);
						return true;
					}
					break;
				}
			}
			while (Module32NextW(snapshot, &module_entry));
		}

		CloseHandle(snapshot);
		return false;
	}

	bool open_process()
	{
		handle = OpenProcess(PROCESS_ALL_ACCESS, FALSE, static_cast<DWORD>(process_id));

		if (handle)
			return true;

		return false;
	}

	bool enable_debug()
	{
		HANDLE hToken;
		LUID sedebugnameValue;
		TOKEN_PRIVILEGES tkp;
		BOOL result;

		if (!OpenProcessToken(GetCurrentProcess(), TOKEN_ADJUST_PRIVILEGES | TOKEN_QUERY, &hToken))
		{
			return false;
		}

		if (!LookupPrivilegeValue(nullptr, SE_DEBUG_NAME, &sedebugnameValue))
		{
			CloseHandle(hToken);
			return false;
		}
		tkp.PrivilegeCount = 1;
		tkp.Privileges[0].Luid = sedebugnameValue;
		tkp.Privileges[0].Attributes = SE_PRIVILEGE_ENABLED;
		result = AdjustTokenPrivileges(hToken, FALSE, &tkp, sizeof tkp, nullptr, nullptr);
		CloseHandle(hToken);
		return result;
	}

public:
	HANDLE handle;

	Memory(std::wstring process_name) : process_name(process_name)
	{
		if (!get_process_id())
			std::exit(-1);

		if (!get_module_base())
			std::exit(-1);

		// if (!enable_debug())
		// 	std::exit(-1);

		if (!open_process())
			std::exit(-1);
	}


	template <typename T, size_t N>
	std::optional<std::array<T, N>> read_memory(uintptr_t address)
	{
		std::array<T, N> buffer;
		SIZE_T bytes_read;

		if (ReadProcessMemory(handle, reinterpret_cast<LPVOID>(address + baseAddress), buffer.data(), N, &bytes_read) &&
			bytes_read)
			return buffer;

		return std::nullopt;
	}

	template <typename T, size_t N>
	bool write_memory(uintptr_t address, std::array<T, N> buffer)
	{
		SIZE_T bytes_written;
		if (WriteProcessMemory(handle, reinterpret_cast<LPVOID>(address + baseAddress), buffer.data(), N,
							   &bytes_written) && bytes_written)
			return true;

		return false;
	}

	DWORD get_last_error()
	{
		return GetLastError();
	}

	std::wstring get_last_error_message()
	{
		LPTSTR errorText = nullptr;

		FormatMessage(
			// use system message tables to retrieve error text
			FORMAT_MESSAGE_FROM_SYSTEM
			// allocate buffer on local heap for error text
			| FORMAT_MESSAGE_ALLOCATE_BUFFER
			// Important! will fail otherwise, since we're not 
			// (and CANNOT) pass insertion parameters
			| FORMAT_MESSAGE_IGNORE_INSERTS,
			nullptr, // unused with FORMAT_MESSAGE_FROM_SYSTEM
			GetLastError(),
			MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
			(LPTSTR)&errorText, // output 
			0, // minimum size for output buffer
			nullptr); // arguments - see note 

		if (nullptr != errorText)
		{
			// ... do something with the string `errorText` - log it, display it to the user, etc.
			std::wstring message(errorText);
			// release memory allocated by FormatMessage()
			LocalFree(errorText);
			errorText = nullptr;
			return message;
		}
		return L"";
	}
};
