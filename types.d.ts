export interface navType {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  url: string;
}

export interface doctorData {
  id: number;
  name: string;
  photo: string;
  specialty: string;
  availability: string;
  rating: number;
  location: string;
}
