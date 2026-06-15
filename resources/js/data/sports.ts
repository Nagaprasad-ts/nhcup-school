// Sport data is now stored in the database (sports table).
// This file only exports the TypeScript interface used across components.

export interface Sport {
    id: number;
    sport_id: string; // slug e.g. 'basketball'
    name: string;
    icon: string;
    badge: string;
    teams: string; // display string e.g. 'U14 / U16 Boys & Girls'
    categories: string[];
    genders: string[];
    player_type: string; // 'standard' | 'rank' | 'athletics' | 'taekwondo'
    max_players: number;
    pdf_entry: string;
    pdf_rules: string;
    is_active: boolean;
}
