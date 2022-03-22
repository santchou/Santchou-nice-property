import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

const Banner = ({
  purpose,
  // title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
    <Box p="20px 50px" bg="white" m="10px" borderRadius="5px">
      <Text
        color="black"
        fontSize="lg"
        fontWeight="bold"
        borderBottom="1px"
        borderColor="gray.100"
        p="5px"
      >
        {purpose}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl" colorScheme="blue">
        <Link href={linkName}>
          <a>{buttonText}</a>
        </Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertyForSale, propertyForRent }) {
  return (
    <Box>
      <Banner
        purpose="RENT A ROME"
        desc1="Explore Apartement, Villas, Home"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?porpose=for-rent"
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {propertyForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A ROME"
        desc1="Explore Apartement, Villas, Home"
        desc2="and more"
        buttonText="Explore buying"
        linkName="/search?porpose=for-sale"
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {propertyForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertyForSale: propertyForSale?.hits,
      propertyForRent: propertyForRent?.hits,
    },
  };
}
