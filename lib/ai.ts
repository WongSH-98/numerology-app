import { supabase } from '@/lib/supabase';

export interface NumerologyResponse {
  life_path_number: number;
  birth_day_number: number;
  expression_number: number | null;
  soul_urge_number: number | null;
  personality_number: number | null;
  summary: string;
  insights: {
    strengths: string[];
    challenges: string[];
    guidance: string[];
  };
}

export async function generateNumerology(dateOfBirth: string, name?: string): Promise<NumerologyResponse | null> {
  try {
    const { data, error } = await supabase.functions.invoke('numerology-ai', {
      body: { dateOfBirth, name: name ?? null },
    });
    if (error) {
      console.warn('numerology-ai invoke error:', error);
      return null;
    }
    return data as NumerologyResponse;
  } catch (err) {
    console.warn('numerology-ai invoke threw:', err);
    return null;
  }
}
