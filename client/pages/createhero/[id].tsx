import { useState, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import { useCreateHeroMutation, useUpdateHeroMutation } from '@/store/api/heroApi';
import { useRouter } from 'next/router';
import { ICreateHero, IHero } from '@/model';
import { useTypedSelector } from '@/hook/useTypedSelector';
import UploadButtons from '@/components/UploadButtons';


const initialState = {
  nickname: '',
  real_name: '',
  origin_description: '',
  catch_phrase: '',
  picture: undefined,
};

const CreateHeroPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { heroes } = useTypedSelector(state => state.hero);
  const heroesEdit = heroes.find((item: IHero) => item._id === id);

  const [formData, setFormData] = useState<ICreateHero>(() => {
    const newState = detectForm(id, initialState, heroesEdit);
    return newState;
  });

  function detectForm(id: any, f1: any, f2: any) {
    if (id === 'ADD') {
      return f1;
    }
    return f2;
  }

  const [createHeroMutation, { isLoading: createLoading, error: createError }] = useCreateHeroMutation();
  const [updateHeroMutation, { isLoading: updateLoading, error: updateError }] = useUpdateHeroMutation();
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nickname, real_name, origin_description, catch_phrase, picture } = formData;

    const formDataObj = new FormData();
    formDataObj.append('nickname', nickname);
    formDataObj.append('real_name', real_name);
    formDataObj.append('origin_description', origin_description);
    formDataObj.append('catch_phrase', catch_phrase);
    if (picture) {
      formDataObj.append('picture', picture);
    }
    if (id === "ADD") {
      //@ts-ignoreі
      await createHeroMutation(formDataObj);
    } else {
      await updateHeroMutation({ id: id as string, formDataObj }); // Pass an object with `id` and `formDataObj`
    }
    try {
      setFormData(initialState);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData(prevFormData => ({
        ...prevFormData,
        picture: file,
      }));
    }
  };

  return (
    <Box maxWidth={400} margin="auto">
      <h1>{detectForm(id, 'Add New Hero', 'Edit Hero')}</h1>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Nickname"
          name="nickname"
          value={formData?.nickname}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Real Name"
          name="real_name"
          value={formData?.real_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Origin Description"
          name="origin_description"
          value={formData?.origin_description}
          onChange={handleInputChange}
          fullWidth
          multiline
          margin="normal"
        />
        <TextField
          label="Catch Phrase"
          name="catch_phrase"
          value={formData?.catch_phrase}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Stack spacing={2}>
          <UploadButtons handleImageChange={handlePictureChange} />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {detectForm(id, "Save Hero", "Edit Hero")}
          </Button>
          <Button variant="outlined" color="primary" fullWidth
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Stack>

      </form>
    </Box>
  );
};

export default CreateHeroPage;

