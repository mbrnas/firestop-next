import { useState } from "react";
import { Flex, Box, Heading, Button, Input, Textarea, FormControl, FormLabel } from "@chakra-ui/react";

export const ReportForm: React.FC = () => {
  return (
    <Box>
      <Heading mb={4}>Submit a Wildfire Report</Heading>
      <FormControl id="location" mb={4}>
        <FormLabel>Location</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl id="severity" mb={4}>
        <FormLabel>Severity</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea />
      </FormControl>
      <FormControl id="reporterName" mb={4}>
        <FormLabel>Reporter Name</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl id="reporterContact" mb={4}>
        <FormLabel>Reporter Contact</FormLabel>
        <Input type="text" />
      </FormControl>
      <Button colorScheme="red">Submit Report</Button>
    </Box>
  );
};