import { ICreateHerok, ICreateImegesHero, ICreateSuperpowers, IHero, IImageHero, IPower } from '@/model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const heroApi = createApi({
  reducerPath: 'heroApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    createHero: builder.mutation<IHero, ICreateHerok>({
      query: (dto) => ({
        url: '/heros',
        method: 'POST',
        body: dto,
      }),
    }),
    createImageHero: builder.mutation<IImageHero, ICreateImegesHero>({
      query: (dto) => ({
        url: '/heros/imges',
        method: 'POST',
        body: dto,
      }),
    }),
    createSuperpower: builder.mutation<IPower, ICreateSuperpowers>({
      query: (dto) => ({
        url: '/heros/power',
        method: 'POST',
        body: dto,
      }),
    }),
    getHeroes: builder.query<IHero[], { count?: number; offset?: number }>({
      query: (params) => ({
        url: '/heros?count=0&offset=0',
        method: 'GET',
        params,
      }),
    }),
    searchHeroes: builder.query<IHero[], { query: string }>({
      query: (params) => ({
        url: '/heros/search',
        method: 'GET',
        params,
      }),
    }),
    getHero: builder.query<IHero, { id: string }>({
      query: ({ id }) => `/heros/${id}`,
    }),
    deleteHero: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/heros/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateHeroMutation,
  useCreateImageHeroMutation,
  useCreateSuperpowerMutation,
  useGetHeroesQuery,
  useLazyGetHeroesQuery,
  useLazyGetHeroQuery,
  useSearchHeroesQuery,
  useGetHeroQuery,
  useDeleteHeroMutation,
} = heroApi;
