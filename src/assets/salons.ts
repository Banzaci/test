import Result from './data.json'

export type SalonItemProps = {
  id: number;
  votes: string;
  name: string;
  img: string;
  address: {
    street: string;
    streetNumber: string;
    zip: string;
    city: string;
  },
  price: number;
  phone: string;
  openingHrs: {
    from: number;
    to: number;
  };
  description: string;
  duration: string;
  ratings: number;
  slot: number;
  website: string;
}

export type SalonListProps = Pick<SalonItemProps, 'votes' | 'name' | 'price' | 'duration' | 'slot' | 'address' | 'id' | 'ratings'>

export const SalonList: SalonItemProps[] = Result.data;

export const getById = (id: number) => SalonList.find((slot) => slot.id === id);