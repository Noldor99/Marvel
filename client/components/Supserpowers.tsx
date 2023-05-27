import { IPower, IHero } from '@/model';
import { useDeleteSuperpowerMutation, useCreateSuperpowerMutation } from '@/store/api/heroApi';
import { Delete } from '@mui/icons-material';
import { Typography, Button, TextField, IconButton } from '@mui/material';
import React, { useState } from 'react';
import FlexBetween from './styleComponents/FlexBetween';

interface SupserpowersProps {
  hero?: IHero;
}

const Supserpowers: React.FC<SupserpowersProps> = ({ hero }) => {
  const [deleteSuperpower] = useDeleteSuperpowerMutation();
  const [createSuperpower] = useCreateSuperpowerMutation();
  const [newSuperpower, setNewSuperpower] = useState('');

  const handleDeleteSuperpower = (powerId: string) => {
    deleteSuperpower({ id: powerId });
  };

  const handleCreateSuperpower = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //@ts-ignore
    createSuperpower({ heroId: hero._id, superpowers: newSuperpower });
    setNewSuperpower('');
  };

  return (
    <>
      <Typography variant="h5">Supserpowers:</Typography>
      {hero?.powers.map((power: IPower) => (
        <div key={power._id}>
          <FlexBetween>
            <Typography>{power.superpowers}</Typography>
            <IconButton
              color="error"
              sx={{ ml: 5 }}
              onClick={() => handleDeleteSuperpower(power._id)}>
              <Delete />
            </IconButton>
          </FlexBetween>
        </div>
      ))}
      <form onSubmit={handleCreateSuperpower}>
        <FlexBetween>
          <TextField
            label="New Superpower"
            value={newSuperpower}
            variant="standard"
            size='small'
            onChange={(e) => setNewSuperpower(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </FlexBetween>
      </form>

    </>
  );
};

export default Supserpowers;
