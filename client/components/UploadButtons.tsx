import * as React from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Box from '@mui/material/Box';
import ListItemButtonBlue from './styleComponents/ListItemButtonBlue';

interface UploadButtonsProps {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadButtons({ handleImageChange }: UploadButtonsProps) {
  const [fileName, setFileName] = React.useState('File name');

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    setFileName(file.name);
    handleImageChange(event);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
      <label htmlFor="file-upload">
        <input
          accept="image/*"
          id="file-upload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
        <ListItemButtonBlue color="primary" aria-label="upload picture"  >
          <PhotoCamera />
        </ListItemButtonBlue>
      </label>
      <span>{fileName}</span>
    </Box>
  );
}
