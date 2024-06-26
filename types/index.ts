export type Images = {
  total: number;
  totalHits: number;
  hits: Hit[];
};

export type Hit = {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
};

export type Filter = {
  type?: string;
  order?: string;
  colors?: string;
  orientation?: string;
};

export type FilterName = "order" | "orientation" | "type" | "colors";

export type Section = {
  data: string[];
  filters: Filter | null;
  filterName: FilterName;
  setFilters: React.Dispatch<React.SetStateAction<Filter | null>>;
};
