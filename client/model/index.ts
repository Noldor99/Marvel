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

export interface ICreateHerok {
  nickname: string;
  real_name: string;
  origin_description: string;
  catch_phrase: string;
  title_images: string;
}

export interface ICreateImegesHero {
  image: string;
  heroId: string;
}

export interface ICreateSuperpowers {
  superpowers: string;
  heroId: string;
}
