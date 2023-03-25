#include <iostream>
#include <optional>
export module Nier;

import Memory;
import Player;

using namespace std;

using player_blob = optional<array<char, sizeof(Player)>>;

export class Nier
{
private:
	Memory memory;
	const uintptr_t player_address = 0x4374A20;

	void fishing_skip_wait_time()
	{
		std::array<char, 1> patch = {'\x03'};
		memory.write_memory(0x03A6B5C, patch); // F3 0F 10 35 ? ? ? ? C7 87 + 0xE
	}

	void fishing_skip_battle()
	{
		std::array<char, 2> patch = {'\x90', '\x90'};
		memory.write_memory(0x03A5E31, patch); // 48 8B CF E8 ? ? ? ? 84 C0 74 06 + 0xA
	}

	void prevent_character_update()
	{
		std::array<char, 6> patch = {'\x90', '\x90', '\x90', '\x90', '\x90', '\x90'};
		memory.write_memory(0x03B12E0, patch);
		// *(E9 ? ? ? ? 33 D2 48 8D 0D ? ? ? ? 48 83 C4 28 E9 ? ? ? ? BA + 0x1), 0x0
	}

	void money_infinite()
	{
		std::array<char, 6> patch = {'\x90', '\x90', '\x90', '\x90', '\x90', '\x90'};
		memory.write_memory(0x03BBA9F, patch); // *(E8 ? ? ? ? 8B 4C 24 58 8B D5 + 0x1), 0x1F
	}

	void health_infinite()
	{
		std::array<char, 5> patch = {'\x90', '\x90', '\x90', '\x90', '\x90'};
		memory.write_memory(0x5F72DED, patch);
	}

	void magic_infinite()
	{
		std::array<char, 6> patch = {'\x90', '\x90', '\x90', '\x90', '\x90', '\x90'};
		memory.write_memory(0x03BE2BE, patch); // F3 0F 11 54 81
	}

	void prevent_combo_break()
	{
		std::array<char, 6> patch = {'\x90', '\x90', '\x90', '\x90', '\x90', '\x90'};
		memory.write_memory(0x06C2E38, patch); // B2 01 89 9F ? ? ? ? 48 8D 0D + 0x2
	}

	void magic_instant_charge()
	{
		std::array<char, 10> patch = {'\x81', '\x43', '\x38', '\x00', '\x00', '\x20', '\x41', '\x90', '\x90', '\x90'};
		memory.write_memory(0x0567044, patch); // *(E8 ? ? ? ? 83 7B 24 00 + 0x1), 0xF4
	}

	void magic_rapid_fire()
	{
		std::array<char, 2> patch = {'\x90', '\x90'};
		memory.write_memory(0x05678AE, patch); // 72 18 33 D2
	}

public:
	void max_recovery_items(player_blob p)
	{
		for (size_t i = offsetof(Player, recovery); i < offsetof(Player, unk7); ++i)
		{
			p->at(i) = 10;
		}
	}

	void max_cultivation_items(player_blob p)
	{
		for (size_t i = offsetof(Player, cultivation); i < offsetof(Player, cultivation) + offsetof(
				 Cultivation, red_moonflower); ++i)
		{
			p->at(i) = 99;
		}

		for (size_t i = offsetof(Player, cultivation) + offsetof(Cultivation, red_moonflower); i <
			 offsetof(Player, unk8); ++i)
		{
			p->at(i) = 10;
		}
	}

	void max_fishing_items(player_blob p)
	{
		for (size_t i = offsetof(Player, fishing); i < offsetof(Player, unk9); ++i)
		{
			p->at(i) = 99;
		}
	}

	void max_raw_materials(player_blob p)
	{
		for (size_t i = offsetof(Player, raw_materials); i < offsetof(Player, key_items); ++i)
		{
			p->at(i) = 99;
		}
	}

	void max_key_items(player_blob p)
	{
		for (size_t i = offsetof(Player, key_items); i < offsetof(Player, unk10); ++i)
		{
			p->at(i) = 1;
		}
	}

	void max_documents(player_blob p)
	{
		for (size_t i = offsetof(Player, documents); i < offsetof(Player, unk11); ++i)
		{
			p->at(i) = true;
		}
	}

	void max_maps(player_blob p)
	{
		for (size_t i = offsetof(Player, maps); i < offsetof(Player, unk12); ++i)
		{
			p->at(i) = 1;
		}
	}

	void max_owned_weapons(player_blob p)
	{
		for (size_t i = offsetof(Player, weapons); i < offsetof(Player, unk14); ++i)
		{
			if (p->at(i) != static_cast<char>(Weapon_Level::Not_Owned))
				p->at(i) = static_cast<char>(Weapon_Level::Level_4);
		}
	}

	void max_weapons(player_blob p)
	{
		for (size_t i = offsetof(Player, weapons); i < offsetof(Player, unk14); ++i)
		{
			p->at(i) = static_cast<char>(Weapon_Level::Level_4);
		}
	}

	void max_words(Player* player)
	{
		player->words_uloth = static_cast<Words_Uloth>(0xFFFFFFFFFFFFFFFull);
		player->words_zarken = static_cast<Words_Zarken>(0x1FFFFFFFFFFFFFFFull);
	}

	void max_quests(player_blob p)
	{
		for (size_t i = offsetof(Player, quests_5c0); i < offsetof(Player, unk15); ++i)
		{
			p->at(i) = static_cast<char>(0xFF);
		}
	}

	void max_tutorials(Player* player)
	{
		player->tutorials_7f0 = static_cast<Tutorials_7F0>(0xFFFFFF3E35DFFFFFull);
		player->tutorials_7f8 = static_cast<Tutorials_7F8>(0x9EFF7ull);
	}

	void max_c4c_quests(Player* player)
	{
		player->quests_c4c = static_cast<Quests_C4C>(static_cast<unsigned int>(Quests_C4C::The_Promised_Gift) |
			static_cast<unsigned int>(Quests_C4C::The_Promised_Gift_Completed));
	}

	Nier() : memory(L"NieR Replicant ver.1.22474487139.exe")
	{
		if (auto p = memory.read_memory<char, sizeof(Player)>(player_address))
		{
			auto player = reinterpret_cast<Player*>(p->data());

			std::cout << "Welcome " << player->name << std::endl;

			int time = static_cast<int>(player->total_play_time);
			int s = time % 60;
			time /= 60;
			int m = time % 60;
			time /= 60;
			int h = time;
			std::cout << "Total Time Played: " << h << "h " << m << "m " << s << "s" << std::endl;

			std::cout << "Current level: " << (player->level + 1) << std::endl;

			player->character = Character::Nier_Prologue;

			player->money = std::numeric_limits<int>::max();
			player->xp = std::numeric_limits<int>::max();
			player->health = 691337;
			player->magic = 420.f;

			max_recovery_items(p);
			max_cultivation_items(p);
			max_fishing_items(p);
			max_raw_materials(p);
			max_key_items(p);
			max_documents(p);
			max_maps(p);
			max_weapons(p);
			max_quests(p);
			max_words(player);
			max_tutorials(player);
			max_c4c_quests(player);

			memory.write_memory(player_address, *p);

			fishing_skip_wait_time();
			fishing_skip_battle();
			prevent_character_update();
			money_infinite();
			health_infinite();
			magic_infinite();
			prevent_combo_break();
			magic_instant_charge();
			magic_rapid_fire();
		}
		else
		{
			std::wcerr << "Could not get player, error" << memory.get_last_error() << " " << memory.
				get_last_error_message() << std::endl;
			std::exit(-1);
		}
	}
};
