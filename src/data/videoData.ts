import { AIVideoProject } from '../types';

export const aiVideoProjects: AIVideoProject[] = [
  {
    id: 'skincare-hydration-serum',
    title: 'Hydration Serum: Cosmetic Commercial',
    category: 'Product Showcase',
    aspectRatio: '9:16',
    duration: '0:10',
    tagline: 'High-definition macro beauty commercial showcasing serum droplet application, radiant skin texture, and fluid dynamics.',
    description:
      'A refined vertical beauty commercial highlighting the silky application of a hydrating face serum, slow-motion droplet glide, and authentic skin glow designed for social video engagement.',
    tools: ['Runway Gen-3 Alpha', 'Midjourney v6.1', 'ElevenLabs (Sound & Audio)'],
    generationWorkflow: {
      pipeline: 'Image-to-Video',
      promptEngineering:
        'Clean minimalist skincare commercial, macro close-up of a woman gently smoothing a viscous hydrating serum onto glowing skin, slow-motion glass pipette releasing crystal-clear drop, soft studio cosmetics lighting, ultra-sharp 4K beauty finish.',
      motionDynamics:
        'Authentic skin elasticity, light subsurface absorption, fluid glide across cheekbone, stabilized vertical 24fps motion.',
      audioVoiceover:
        'Soft ambient spa soundscape with subtle water drop chime and relaxing, atmospheric product audio.',
    },
    posterUrl: '/videos/serum_poster.jpg',
    videoUrl: '/videos/Woman_applying_hydration_serum_202609071745.mp4',
    keyVisualHighlights: [
      'Authentic human skin texture and natural subsurface light scattering',
      'Realistic fluid droplet viscosity, glide, and absorption',
      'Vertical 9:16 social commercial pacing and studio lighting',
    ],
  },
  {
    id: 'luxury-real-estate-voiceover',
    title: 'Modern Luxury Villa: Property Tour & Voiceover',
    category: 'Commercial & Ads',
    aspectRatio: '9:16',
    duration: '0:10',
    tagline: 'Architectural real estate commercial with Steadicam drift, poolside illumination, and full voiceover narration.',
    description:
      'A cinematic property tour designed for social media real estate marketing. Seamlessly glides across a crystal pool patio to contemporary interior architecture with synchronized professional voiceover narration.',
    tools: ['Luma Dream Machine', 'ElevenLabs (AI Voiceover)', 'Custom Architectural Motion'],
    generationWorkflow: {
      pipeline: 'Text-to-Video',
      promptEngineering:
        'Architectural Steadicam glide through modern luxury villa, crystal blue swimming pool with glass reflections, contemporary open-concept interior architecture, warm dusk lighting, ultra-smooth commercial camera motion.',
      motionDynamics:
        'Stabilized Steadicam forward drift, consistent architectural perspective without warping, realistic lighting shift from afternoon to golden dusk.',
      audioVoiceover:
        'Full professional real estate commercial voiceover narration guiding the prospective buyer through the property.',
    },
    posterUrl: '/videos/realestate_poster.jpg',
    videoUrl: '/videos/Real_estate_commercial_voiceover_202609071744.mp4',
    keyVisualHighlights: [
      'Synchronized high-fidelity voiceover narration with ambient audio',
      'Stable planar lines and parallax through expansive architectural facade',
      'Targeted real-estate lead-generation script and persuasive narration delivery',
    ],
  },
];
