-- ==============================================================================
-- NYU PRATAP MITRA MANDAL — PRODUCTION SUPABASE SCHEMA WITH RLS
-- न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. SITE SETTINGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mandal_name TEXT NOT NULL DEFAULT 'न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा',
    mandal_tagline TEXT NOT NULL DEFAULT 'श्री छिन्नमस्ता मातेच्या चरणी नमस्कार',
    idol_form TEXT NOT NULL DEFAULT 'श्री छिन्नमस्ता माता (सहावी महाविद्या)',
    idol_height TEXT NOT NULL DEFAULT '१० फूट',
    idol_sculptor TEXT NOT NULL DEFAULT 'दिपक कानोजे (भुसावळ)',
    founding_year TEXT NOT NULL DEFAULT '१९८०',
    installation_date TEXT NOT NULL DEFAULT '११/१०/२०२६',
    festival_year TEXT NOT NULL DEFAULT '२०२६',
    visarjan_date TEXT NOT NULL DEFAULT '2026-10-21T18:00:00+05:30',
    darshan_morning_start TEXT NOT NULL DEFAULT '०६:०० AM',
    darshan_morning_end TEXT NOT NULL DEFAULT '१२:०० PM',
    darshan_evening_start TEXT NOT NULL DEFAULT '०४:०० PM',
    darshan_evening_end TEXT NOT NULL DEFAULT '११:०० PM',
    aarti_morning TEXT NOT NULL DEFAULT '०७:०० AM',
    aarti_evening TEXT NOT NULL DEFAULT '०७:०० PM',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Site Settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access to site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated users to modify site_settings" ON public.site_settings;

-- Public READ policy (Anyone with anon key can read site settings)
CREATE POLICY "Allow public read access to site_settings"
    ON public.site_settings FOR SELECT
    TO anon, authenticated
    USING (true);

-- Authenticated WRITE policy (Only logged in Supabase admins can modify)
CREATE POLICY "Allow authenticated users to modify site_settings"
    ON public.site_settings FOR ALL
    TO authenticated
    USING (true);

-- Seed default site settings row if table is empty
INSERT INTO public.site_settings (
    mandal_name,
    mandal_tagline,
    idol_form,
    idol_height,
    idol_sculptor,
    founding_year,
    installation_date,
    festival_year,
    visarjan_date,
    darshan_morning_start,
    darshan_morning_end,
    darshan_evening_start,
    darshan_evening_end,
    aarti_morning,
    aarti_evening
)
SELECT
    'न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा',
    'श्री छिन्नमस्ता मातेच्या चरणी नमस्कार',
    'श्री छिन्नमस्ता माता (सहावी महाविद्या)',
    '१० फूट',
    'दिपक कानोजे (भुसावळ)',
    '१९८०',
    '११/१०/२०२६',
    '२०२६',
    '2026-10-21T18:00:00+05:30',
    '०६:०० AM',
    '१२:०० PM',
    '०४:०० PM',
    '११:०० PM',
    '०७:०० AM',
    '०७:०० PM'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);


-- ==============================================================================
-- 3. PHOTOS TABLE (GALLERY)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_mr TEXT NOT NULL,
    title_en TEXT,
    category TEXT NOT NULL CHECK (category IN ('idol', 'karyakarte', 'decoration', 'aarti', 'procession', 'historical')),
    category_label_mr TEXT,
    category_label_en TEXT,
    year INTEGER NOT NULL DEFAULT 2026,
    image_url TEXT NOT NULL,
    aspect_ratio TEXT DEFAULT '4/3',
    caption_mr TEXT,
    caption_en TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Photos
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access to photos" ON public.photos;
DROP POLICY IF EXISTS "Allow authenticated users to modify photos" ON public.photos;

-- Public READ policy (Anyone can view photos)
CREATE POLICY "Allow public read access to photos"
    ON public.photos FOR SELECT
    TO anon, authenticated
    USING (true);

-- Authenticated WRITE policy (Only admin can insert/update/delete)
CREATE POLICY "Allow authenticated users to modify photos"
    ON public.photos FOR ALL
    TO authenticated
    USING (true);


-- ==============================================================================
-- 4. EVENTS TABLE (FESTIVAL PROGRAMME)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    day_number INTEGER, -- Day 1 to 10
    date TEXT, -- YYYY-MM-DD
    event_date DATE,
    day_name_mr TEXT,
    day_name_en TEXT,
    start_time TEXT NOT NULL,
    end_time TEXT,
    time_display_mr TEXT,
    time_display_en TEXT,
    title_mr TEXT NOT NULL,
    title_en TEXT,
    category TEXT NOT NULL CHECK (category IN ('aarti', 'cultural', 'garba', 'bhandara', 'kanya_pujan', 'religious', 'procession')),
    category_label_mr TEXT,
    category_label_en TEXT,
    location_mr TEXT DEFAULT 'मंडप परिसर, डांगरवाडा असोदा',
    location_en TEXT DEFAULT 'Mandal Pandal, Dangarvada Asoda',
    description_mr TEXT,
    description_en TEXT,
    is_highlight BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access to events" ON public.events;
DROP POLICY IF EXISTS "Allow authenticated users to modify events" ON public.events;

-- Public READ policy (Anyone can view festival schedule)
CREATE POLICY "Allow public read access to events"
    ON public.events FOR SELECT
    TO anon, authenticated
    USING (true);

-- Authenticated WRITE policy (Only admin can insert/update/delete)
CREATE POLICY "Allow authenticated users to modify events"
    ON public.events FOR ALL
    TO authenticated
    USING (true);


-- ==============================================================================
-- 5. STORAGE BUCKET SETUP (GALLERY BUCKET)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view images, only authenticated users can upload/modify
DROP POLICY IF EXISTS "Allow public read on gallery bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to gallery bucket" ON storage.objects;

CREATE POLICY "Allow public read on gallery bucket"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'gallery');

CREATE POLICY "Allow authenticated uploads to gallery bucket"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'gallery');
