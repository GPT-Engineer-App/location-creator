import React, { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

const LocationForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <Box position="absolute" top="10px" left="10px" bg="white" p={4} borderRadius="md" boxShadow="md" zIndex="1000">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            placeholder="Enter location name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" colorScheme="blue">Add Location</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LocationForm;