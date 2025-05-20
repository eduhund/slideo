type SlideTemplate = {
  id: string
  header: string
  paragraphs: string[]
  lists: string[][]
  images: string[]
}

const slideTemplates: Record<string, SlideTemplate[]> = {
  P0L0I0: [
    {
      id: 'P0L0I0-1',
      header: 'Header Only',
      paragraphs: [],
      lists: [],
      images: [],
    },
    {
      id: 'P0L0I0-2',
      header: 'Title Slide',
      paragraphs: [],
      lists: [],
      images: [],
    },
  ],
  P1L0I0: [
    {
      id: 'P1L0I0-1',
      header: 'Header with One Paragraph',
      paragraphs: ['This is a single paragraph.'],
      lists: [],
      images: [],
    },
    {
      id: 'P1L0I0-2',
      header: 'Introduction Slide',
      paragraphs: ['Welcome to the presentation.'],
      lists: [],
      images: [],
    },
  ],
  P2L0I0: [
    {
      id: 'P2L0I0-1',
      header: 'Header with Two Paragraphs',
      paragraphs: ['First paragraph.', 'Second paragraph.'],
      lists: [],
      images: [],
    },
    {
      id: 'P2L0I0-2',
      header: 'Detailed Slide',
      paragraphs: ['This is the first detail.', 'This is the second detail.'],
      lists: [],
      images: [],
    },
  ],
  P3L0I0: [
    {
      id: 'P3L0I0-1',
      header: 'Header with Three Paragraphs',
      paragraphs: ['Paragraph one.', 'Paragraph two.', 'Paragraph three.'],
      lists: [],
      images: [],
    },
    {
      id: 'P3L0I0-2',
      header: 'Content Slide',
      paragraphs: [
        'Introduction paragraph.',
        'Main content paragraph.',
        'Conclusion paragraph.',
      ],
      lists: [],
      images: [],
    },
  ],
  P0L1I0: [
    {
      id: 'P0L1I0-1',
      header: 'Header with One List',
      paragraphs: [],
      lists: [['Item 1', 'Item 2', 'Item 3']],
      images: [],
    },
    {
      id: 'P0L1I0-2',
      header: 'Bullet Points Slide',
      paragraphs: [],
      lists: [['Point A', 'Point B', 'Point C']],
      images: [],
    },
  ],
  P0L0I1: [
    {
      id: 'P0L0I1-1',
      header: 'Header with One Image',
      paragraphs: [],
      lists: [],
      images: ['image1.png'],
    },
    {
      id: 'P0L0I1-2',
      header: 'Visual Slide',
      paragraphs: [],
      lists: [],
      images: ['visual1.jpg'],
    },
  ],
  P1L1I1: [
    {
      id: 'P1L1I1-1',
      header: 'Header with Paragraph, List, and Image',
      paragraphs: ['This is a paragraph.'],
      lists: [['List item 1', 'List item 2']],
      images: ['image1.png'],
    },
    {
      id: 'P1L1I1-2',
      header: 'Mixed Content Slide',
      paragraphs: ['Introduction paragraph.'],
      lists: [['Point A', 'Point B']],
      images: ['visual1.jpg'],
    },
  ],
  // Add more combinations as needed (e.g., P2L2I2, P3L3I3, etc.)
}

export default slideTemplates
