'use client';

import { Controller, useForm } from 'react-hook-form';
import { CreateBookPayload } from '../../interfaces/createBookPayload.type';
import { Box, TextField, Button } from '@mui/material';
import { useEffect } from 'react';


type BookFormProps = {
    initialValues?: CreateBookPayload;
    onSubmit: (data: CreateBookPayload) => void;
  };

  const BookEditor: React.FC<BookFormProps> = ({ initialValues, onSubmit }) => {
    const {
      handleSubmit,
      control,
      formState: { errors },
      reset 
    } = useForm<CreateBookPayload>({
      defaultValues: initialValues,
    });

    useEffect(() => {
      if (initialValues) {
        reset(initialValues);
      }
    }, [initialValues, reset]);
  
    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="title"
        control={control}
        rules={{ required: 'Title is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ''}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{ required: 'Description is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
          />
        )}
      />
      <Controller
        name="numberOfPages"
        control={control}
        rules={{
          required: 'Number of Pages is required',
          min: { value: 1, message: 'Number of Pages must be greater than 0' },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Number of Pages"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.numberOfPages}
            helperText={errors.numberOfPages ? errors.numberOfPages.message : ''}
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
    );
  };
  
  export default BookEditor;
