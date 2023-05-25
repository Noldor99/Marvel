import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';


const CreateHeroPage = () => {
  const [nickname, setNickname] = useState('');
  const [realName, setRealName] = useState('');
  const [originDescription, setOriginDescription] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [titleImages, setTitleImages] = useState('');
  const [picture, setPicture] = useState<any>(null);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('real_name', realName);
    formData.append('origin_description', originDescription);
    formData.append('catch_phrase', catchPhrase);
    formData.append('title_images', titleImages);
    formData.append('picture', picture);

    try {
      // Make POST request to API
      // const response = await axios.post('/api/heroes', formData);

      // Handle success response
      // console.log(response.data);

      // Reset form
      setNickname('');
      setRealName('');
      setOriginDescription('');
      setCatchPhrase('');
      setTitleImages('');
      setPicture(null);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <Box maxWidth={400} margin="auto">
      <h1>Create Hero</h1>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Real Name"
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Origin Description"
          value={originDescription}
          onChange={(e) => setOriginDescription(e.target.value)}
          fullWidth
          multiline
          margin="normal"
        />
        <TextField
          label="Catch Phrase"
          value={catchPhrase}
          onChange={(e) => setCatchPhrase(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Title Images"
          value={titleImages}
          onChange={(e) => setTitleImages(e.target.value)}
          fullWidth
          margin="normal"
        />
        <input type="file" onChange={(e: any) => setPicture(e.target.files[0])} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Hero
        </Button>
      </form>
    </Box>
  );
};

export default CreateHeroPage;
