import { ICreateHero, ICreateImegesHero, ICreateSuperpowers, IHero, IImageHero, IPower } from '@/model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const heroApi = createApi({
  reducerPath: 'heroApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Heroes'],
  endpoints: (builder) => ({
    createHero: builder.mutation<IHero, ICreateHero>({
      query: (dto) => ({
        url: '/heros',
        method: 'POST',
        body: dto,
      }),
      //@ts-ignores
      invalidatesTags: ['Heroes'],
    }),
    updateHero: builder.mutation<any, { id: string; formDataObj: FormData }>({
      query: ({ id, formDataObj }) => ({
        url: `/heros/${id}`,
        method: 'PUT',
        body: formDataObj,

      }),
      //@ts-ignore
      invalidatesTags: ['Heroes'],
    }),
    createImageHero: builder.mutation<IImageHero, ICreateImegesHero>({
      query: (dto) => ({
        url: `/imges`,
        method: 'POST',
        body: dto,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      }),
      //@ts-ignore
      invalidatesTags: ['Heroes'],
    }),
    deleteImageHero: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/imges/${id}`,
        method: 'DELETE',
      }),
      //@ts-ignore
      invalidatesTags: ['Heroes'],
    }),
    createSuperpower: builder.mutation<IPower, ICreateSuperpowers>({
      query: (dto) => ({
        url: '/power',
        method: 'POST',
        body: dto,
      }),
      //@ts-ignores
      invalidatesTags: ['Heroes'],
    }),
    deleteSuperpower: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/power/${id}`,
        method: 'DELETE',
      }),
      //@ts-ignores
      invalidatesTags: ['Heroes'],
    }),
    getHeroes: builder.query<IHero[], { count: number; offset: number }>({
      query: (params) => ({
        url: `/heros?`,
        method: 'GET',
        params,
      }),
      //@ts-ignore
      providesTags: ['Heroes'],
    }),
    searchHeroes: builder.query<IHero[], { query: string }>({
      query: (params) => ({
        url: '/heros/search',
        method: 'GET',
        params,
      }),
    }),
    getHero: builder.query<IHero, { id: string }>({
      query: ({ id }) => ({
        url: `/heros/${id}`,
        method: 'GET',
      }),
      //@ts-ignore
      providesTags: ['Heroes'],
    }),
    deleteHero: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/heros/${id}`,
        method: 'DELETE',
      }),
      //@ts-ignore
      invalidatesTags: ['Heroes'],
    }),
  }),
});


export const {
  useCreateHeroMutation,
  useCreateImageHeroMutation,
  useCreateSuperpowerMutation,
  useGetHeroesQuery,
  useUpdateHeroMutation,
  useLazyGetHeroesQuery,
  useLazyGetHeroQuery,
  useSearchHeroesQuery,
  useDeleteSuperpowerMutation,
  useGetHeroQuery,
  useDeleteImageHeroMutation,
  useDeleteHeroMutation,
} = heroApi;
