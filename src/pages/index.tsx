import { Button, Flex, Heading, Image, Text, Stack, useBreakpointValue, Box, Link } from '@chakra-ui/react';

import { signIn, signUp, requireNextAuth } from '@roq/nextjs';

import Head from 'next/head';
import { HelpBox } from 'components/help-box';

function HomePage() {
  return (
    <>
      <Head>
        <title>{`Sports Performance`}</title>

        <meta
          name="description"
          content="Unlock your team's potential with Sports Performance - Empowering athletes and coaches through comprehensive tracking of effort, recovery, sleep quality, and training perception."
        />
      </Head>

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack position="relative" spacing={6} w={'full'} maxW={'lg'}>
            <HelpBox />
            <Image src="/roq.svg" alt="Logo" w="150px" mb="8" />
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text as={'span'}>Explore</Text>{' '}
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'cyan.400',
                  zIndex: -1,
                }}
              >
                {`Sports Performance`}
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              {`Unlock your team's potential with Sports Performance - Empowering athletes and coaches through comprehensive tracking of effort, recovery, sleep quality, and training perception.`}
            </Text>
            <Stack direction="column" spacing={4} className="roles-container">
              <Stack className="owner-roles-container" direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Button
                  rounded={'full'}
                  bg={'cyan.500'}
                  color={'white'}
                  _hover={{
                    bg: 'cyan.700',
                  }}
                  onClick={() => signUp('coach')}
                >
                  Create Account
                </Button>
                <Button rounded={'full'} onClick={() => signIn('coach')}>
                  Login
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
        <Flex position="relative" flex={1}>
          <Image
            src={
              'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjA3NjB8MHwxfHNlYXJjaHwxfHxhdGhsZXRlcyUyQ3RyYWluaW5nfGVufDB8fHx8MTY4ODE2Nzk0Nnww&ixlib=rb-4.0.3&q=80&w=1080'
            }
            alt={'Login Image'}
            objectFit={'cover'}
          />
          <Box position="absolute" top="0" backgroundColor="rgba(0,0,0,0.6)" width="100%" py="2">
            <Text align="center" fontSize="sm" color="white">
              Photo by{' '}
              <Link
                href="https://unsplash.com/ko/@echaparro?utm_source=roq-generator&utm_medium=referral"
                isExternal
                color="teal.200"
              >{`Edgar Chaparro`}</Link>{' '}
              on{' '}
              <Link
                href="https://unsplash.com/?utm_source=roq-generator&utm_medium=referral"
                isExternal
                color="teal.200"
              >
                Unsplash
              </Link>
            </Text>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: true,
  redirectTo: '/users',
})(HomePage);
