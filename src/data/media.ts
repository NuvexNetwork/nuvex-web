/** Photographs stored in /public/media. Credits also listed on /licenses. */

export type MediaPhoto = {
  src: string;
  alt: string;
  credit: { label: string; href: string };
};

export const media = {
  nebula: {
    src: "/media/nebula.jpg",
    alt: "A blue bubble nebula in deep space",
    credit: {
      label: "NASA, Unsplash",
      href: "https://unsplash.com/photos/blue-and-red-galaxy-with-stars-Q1p7bh3SHj8",
    },
  },
  galaxy: {
    src: "/media/galaxy.jpg",
    alt: "The Milky Way filling a dark frame",
    credit: {
      label: "Unsplash",
      href: "https://unsplash.com/photos/blue-and-purple-galaxy-artwork-oMpAjrd17C4",
    },
  },
  void: {
    src: "/media/void.jpg",
    alt: "A dense star field on black",
    credit: {
      label: "Unsplash",
      href: "https://unsplash.com/photos/stars-in-the-sky-during-night-time-cIX5TlSufDs",
    },
  },
  cosmos: {
    src: "/media/cosmos.jpg",
    alt: "A colourful band of the Milky Way",
    credit: {
      label: "Unsplash",
      href: "https://unsplash.com/photos/blue-and-yellow-galaxy-illustration-f5pJlAy5Jtg",
    },
  },
  fade: {
    src: "/media/fade.jpg",
    alt: "A grainy violet-to-black gradient field",
    credit: {
      label: "Milad Fakurian, Unsplash",
      href: "https://unsplash.com/photos/a-blurry-image-of-a-purple-and-black-background-58Z17lnVS4U",
    },
  },
  blobs: {
    src: "/media/blobs.jpg",
    alt: "Blue layered waves in three dimensions",
    credit: {
      label: "Milad Fakurian, Unsplash",
      href: "https://unsplash.com/photos/a-blue-abstract-background-with-a-wavy-design-E8Ufcyxz514",
    },
  },
  cubes: {
    src: "/media/cubes.jpg",
    alt: "A lattice of cubes linked by light",
    credit: {
      label: "Unsplash",
      href: "https://unsplash.com/photos/a-group-of-white-cubes-floating-in-the-air-sYkCwGdzNAs",
    },
  },
  orbit: {
    src: "/media/orbit.jpg",
    alt: "Earth from orbit beside a spacecraft",
    credit: {
      label: "NASA, Unsplash",
      href: "https://unsplash.com/photos/white-satellite-over-earth-yZygONrUBe8",
    },
  },
  chip: {
    src: "/media/chip.jpg",
    alt: "Macro photograph of a populated circuit board",
    credit: {
      label: "Unsplash",
      href: "https://unsplash.com/photos/black-circuit-board-FO7JIlwjOtU",
    },
  },
  nodes: {
    src: "/media/nodes.jpg",
    alt: "A circuit layout photographed as white traces on black",
    credit: {
      label: "Unsplash",
      href: "https://unsplash.com/photos/closeup-photo-of-circuit-board-g5Uh7n9YTlY",
    },
  },
  racks: {
    src: "/media/racks.jpg",
    alt: "Network racks with fibre running across black doors",
    credit: {
      label: "Taylor Vick, Unsplash",
      href: "https://unsplash.com/photos/cables-on-a-server-rack-M5tzZtFCOfQ",
    },
  },
  dc: {
    src: "/media/dc.jpg",
    alt: "The platter of an open hard disk",
    credit: {
      label: "Unsplash",
      href: "https://unsplash.com/photos/black-hard-disk-drive-wDsZyFlP4Z0",
    },
  },
  aurora: {
    src: "/media/aurora.jpg",
    alt: "Aurora over a snow field under a star field",
    credit: {
      label: "Jonatan Pie, Unsplash",
      href: "https://unsplash.com/photos/green-and-purple-aurora-over-snow-HWi5gx8z-9M",
    },
  },
  matrix: {
    src: "/media/matrix.jpg",
    alt: "Green terminal characters on a dark display",
    credit: {
      label: "Markus Spiske, Unsplash",
      href: "https://unsplash.com/photos/green-and-black-computer-code-iar-afB0QQw",
    },
  },
  night: {
    src: "/media/night.jpg",
    alt: "A night sky over a mountain ridge",
    credit: {
      label: "Benjamin Voros, Unsplash",
      href: "https://unsplash.com/photos/mountain-under-starry-sky-phIFdC6lA4E",
    },
  },
  earth: {
    src: "/media/earth.jpg",
    alt: "Earth from orbit, night side lit by cities",
    credit: {
      label: "NASA, Unsplash",
      href: "https://unsplash.com/photos/photo-of-outer-space-yZygONrUBe8",
    },
  },
  stars: {
    src: "/media/stars.jpg",
    alt: "A purple dusk sky over a ridgeline",
    credit: {
      label: "Vincentiu Solomon, Unsplash",
      href: "https://unsplash.com/photos/milky-way-above-mountains-ln5drpv_ImI",
    },
  },
} as const satisfies Record<string, MediaPhoto>;

export type MediaKey = keyof typeof media;

export const mediaList: MediaPhoto[] = Object.values(media);
