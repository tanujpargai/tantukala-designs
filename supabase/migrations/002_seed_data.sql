-- ====================================================================
-- TANTUKALA DESIGNS - SEED DATA
-- Authentic handcrafted collections, artisan profiles, and products
-- ====================================================================

-- 1. CATEGORIES
INSERT INTO categories (id, name, slug, description, image_url, sort_order) VALUES
('c1111111-1111-1111-1111-111111111111', 'Madhubani Art Panels', 'madhubani-art-panels', 'Sacred and folk Mithila art rendered with fine bamboo nibs and natural earth pigments on treated handmade paper and raw tussar silk.', '/images/craft-madhubani.jpg', 1),
('c2222222-2222-2222-2222-222222222222', 'Heritage Handloom Sarees', 'heritage-handloom-sarees', 'Slowly woven on traditional pit looms using wild forest tussar, pure mulberry silk, and indigenous kora cotton.', '/images/craft-saree.jpg', 2),
('c3333333-3333-3333-3333-333333333333', 'Artisanal Dupattas & Stoles', 'artisanal-dupattas-stoles', 'Featherlight draped textiles featuring Sujni needlework, Kantha tapestries, and Kutch nomad mirror embroidery.', '/images/craft-dupatta.jpg', 3),
('c4444444-4444-4444-4444-444444444444', 'Living & Interior Textiles', 'living-interior-textiles', 'Hand-loomed cushion covers, ceremonial wall tapestries, and resist-printed table linens crafted for heirloom homes.', '/images/craft-living.jpg', 4)
ON CONFLICT (slug) DO NOTHING;

-- 2. COLLECTIONS
INSERT INTO collections (id, title, slug, subtitle, description, editorial_story, image_url, is_featured, sort_order) VALUES
('b1111111-1111-1111-1111-111111111111', 'Madhubani Reverie', 'madhubani-reverie', 'Songs of the Mithila Forest', 'Intricate ceremonial panels illustrating the celestial Tree of Life, aquatic flora, and ancient cosmological motifs.', 'In the tranquil courtyards of Jitwarpur and Ranti, women artisans dip twigs and fine brushes into natural soot, crushed madder, and ground turmeric. Each line honors cosmic fertility, seasonal monsoons, and sacred bonds.', '/images/6a7028109b897dc237d217cc_sujni bihar.avif', true, 1),
('b2222222-2222-2222-2222-222222222222', 'Sujni & Kantha Whispers', 'sujni-kantha-whispers', 'Poetry in the Running Stitch', 'Centuries-old narrative needlework where layered vintage fabrics and wild silks are bound by thousands of delicate stitches.', 'Originating as protective quilts woven with motherly prayers, Sujni and Kantha transform quiet domestic moments into monumental handloom tapestries celebrated across museum collections worldwide.', '/images/6a7028109b82105cdec69189_kantha.avif', true, 2),
('b3333333-3333-3333-3333-333333333333', 'Nomadic Kutch Rabari & Jat', 'kutch-nomad-weaves', 'Desert Sun & Mirrored Horizons', 'Bold geometric counted-thread embroidery, hand-set mirrors, and heavy handloom textures from the arid salt plains.', 'Carried through nomadic migrations across the Great Rann, Rabari and Jat embroideries are visual crests of tribal dignity, resilient community memory, and desert sun reflections.', '/images/6a702810d699d522952e242a_rabari.avif', true, 3),
('b4444444-4444-4444-4444-444444444444', 'Bela Resist & Block Chronicle', 'bela-block-chronicle', 'Carved Teak & Earth Dyes', 'Hand-carved wooden block impressions rendered with vegetable mordants and pure natural indigo extracts.', 'Every impression in Bela block printing requires absolute tactile equilibrium: the resonant thump of the artisan’s fist upon carved teak blocks, dipping into natural gum and mineral pastes.', '/images/6a702810b4534034705d7719_bela block.avif', true, 4)
ON CONFLICT (slug) DO NOTHING;

-- 3. ARTISAN STORIES
INSERT INTO artisan_stories (id, name, slug, craft_specialty, village_region, state, experience_years, bio, quote, portrait_image, is_featured, sort_order) VALUES
('a1111111-1111-1111-1111-111111111111', 'Radhika Devi', 'radhika-devi', 'Master Sujni Embroiderer', 'Bhusra Village, Muzaffarpur', 'Bihar', 32, 'Radhika began learning Sujni running-stitch at age eight under her grandmother’s watchful eye. Over three decades, she has led a cooperative of 65 women, transforming antique quilt techniques into contemporary gallery-grade wall tapestries.', 'When my needle pierces the silk, it does not merely make a stitch — it fastens the voice of our mothers into the cloth for our daughters to inherit.', '/images/artisan-radhika.jpg', true, 1),
('a2222222-2222-2222-2222-222222222222', 'Govindbhai Khatri', 'govindbhai-khatri', '5th Gen Bela Block Print Master', 'Dhamadka, Kutch', 'Gujarat', 38, 'Carrying forward an uninterrupted lineage of block printers dating back to the 18th century, Govindbhai carves his own seasoned teak blocks and brews organic resist pastes using tamarind seed flour, iron rust, and wild alizarin.', 'The wood remembers what the water tells it. In the rhythm of printing, time ceases to rush and begins to sing.', '/images/artisan-govind.jpg', true, 2),
('a3333333-3333-3333-3333-333333333333', 'Parvati Paswan', 'parvati-paswan', 'Godna & Kachni Madhubani Artist', 'Jitwarpur, Madhubani', 'Bihar', 28, 'Renowned for her extraordinary rhythmic line work and mythological animal allegories, Parvati creates master panels using black ink soot collected from mustard oil lamps and natural sap from local acacia trees.', 'We draw the fish because it knows the river intimately. We draw the lotus because it rises untouched from the swamp. Our art is our prayer to life.', '/images/artisan-parvati.jpg', true, 3)
ON CONFLICT (slug) DO NOTHING;

-- 4. JOURNAL POSTS
INSERT INTO journal_posts (id, title, slug, excerpt, content, cover_image, author, reading_time, category, is_published) VALUES
('j1111111-1111-1111-1111-111111111111', 'The Living Thread: Why Authentic Handloom Outlives Industrial Speed', 'living-thread-handloom-longevity', 'In an era of hyper-synthetic fast fashion, Indian handlooms breathe with organic character, irregular charm, and enduring structural integrity.', 'A machine produces uniformity; an artisan produces soul. When you hold a yard of hand-spun Khadi or wild forest Tussar, you are holding weeks of manual rhythm, tensioned threads held by human foot-pedals, and centuries of tacit knowledge. Each weave micro-expands with climate and softens gracefully across decades.', '/images/6a8a6fe862645fab0c5c71db_craft hero.avif', 'Tantukala Archive', '6 min read', 'Textile Philosophy', true),
('j2222222-2222-2222-2222-222222222222', 'From Mud Courtyards to Fine Art: The Sacred Geometry of Madhubani', 'sacred-geometry-madhubani', 'Deciphering the celestial iconography of Mithila art — where every lotus petal, peacock feather, and fish scales encodes Vedic astronomy.', 'Originating during the era of King Janaka according to folklore, Mithila painting was painted onto freshly plastered mud walls for festive nuptials. The double-contour lines, geometric fills, and plant-derived pigments form a cosmological language that is both deeply mystical and graphically peerless.', '/images/6a7028109b897dc237d217cc_sujni bihar.avif', 'Tantukala Curatorial', '8 min read', 'Craft Heritage', true)
ON CONFLICT (slug) DO NOTHING;

-- 5. SITE SETTINGS
INSERT INTO site_settings (key, value, description) VALUES
('general', '{"brand_name": "Tantukala Designs", "tagline": "Where Heritage Becomes Art", "support_phone": "+91 93199 27100", "support_email": "care@tantukaladesigns.com", "currency": "INR", "currency_symbol": "₹"}', 'General store information'),
('shipping', '{"free_shipping_threshold": 4999, "standard_shipping_rate": 199, "express_shipping_rate": 450, "estimated_days_min": 3, "estimated_days_max": 7}', 'Shipping calculation rules'),
('banner', '{"is_active": true, "message": "Complimentary Pan-India Shipping on Curated Orders Above ₹4,999 • Handcrafted with Pride", "link": "/shop"}', 'Header top banner announcement')
ON CONFLICT (key) DO NOTHING;
