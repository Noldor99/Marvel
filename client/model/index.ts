export interface IHero {
  _id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  catch_phrase: string;
  title_images: string;
  powers: IPower[];
  images_hero: IImageHero[];
}

export interface IPower {
  _id: string;
  superpowers: string;
  hero: IHero;
}

export interface IImageHero {
  _id: string;
  image: string;
  image_hero: IHero;
}

export interface ICreateHero {
  nickname: string;
  real_name: string;
  origin_description: string;
  catch_phrase: string;
  picture?: File;
}

export interface ICreateImegesHero {
  heroId: string;
  picture: File;
}

export interface ICreateSuperpowers {
  superpowers: string;
  heroId: string;
}
