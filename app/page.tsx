"use client";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { ReportForm } from "./components/ReportForm";
import MapComponent from "./components/MapComponent";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Flex minH="100vh" align="center" justify="center" p={6} gap={4}>
      <Box flex="1" maxW="700px" mr={4}>
        {!showForm ? (
          <>
            <Heading mb={4}>
              Welcome to the Wildfire Incidents Dashboard
            </Heading>
            <Button colorScheme="red" onClick={() => setShowForm(true)}>
              Report
            </Button>
          </>
        ) : (
          <ReportForm />
        )}
      </Box>
      <Box>
        <MapComponent />
      </Box>
    </Flex>
  );
}
