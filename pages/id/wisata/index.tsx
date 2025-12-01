import React from 'react'
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import Layout from 'components/layout'
import MediaHeader from 'components/media.header'
import { BoxStyled } from 'pages/id/videos/index'
import { AccessibilityContext } from 'contexts/accessibility'
import { getOrganization } from 'utils/services/organization'

interface WisataItem {
  id: number
  title: string
  description: string
  image: string
}

const wisataData: WisataItem[] = [
  {
    id: 1,
    title: 'Tugu Pahlawan',
    description: 'Monumen bersejarah yang menjadi simbol kepahlawanan rakyat Surabaya dalam pertempuran 10 November 1945.',
    image: '/images/wisata/tugu-pahlawan.jpg',
  },
  {
    id: 2,
    title: 'Kebun Binatang Surabaya',
    description: 'Kebun binatang tertua di Indonesia yang memiliki koleksi satwa lengkap dan menjadi destinasi wisata keluarga.',
    image: '/images/wisata/kebun-binatang.jpg',
  },
  {
    id: 3,
    title: 'House of Sampoerna',
    description: 'Museum dan pabrik rokok bersejarah dengan arsitektur kolonial Belanda yang indah.',
    image: '/images/wisata/house-of-sampoerna.jpg',
  },
  {
    id: 4,
    title: 'Jembatan Suramadu',
    description: 'Jembatan terpanjang di Indonesia yang menghubungkan Pulau Jawa dan Pulau Madura.',
    image: '/images/wisata/suramadu.jpg',
  },
  {
    id: 5,
    title: 'Submarine Monument',
    description: 'Monumen kapal selam KRI Pasopati 410 yang menjadi museum dan objek wisata sejarah maritim.',
    image: '/images/wisata/submarine.jpg',
  },
  {
    id: 6,
    title: 'Pantai Kenjeran',
    description: 'Pantai populer di Surabaya dengan pemandangan indah dan berbagai wahana rekreasi.',
    image: '/images/wisata/kenjeran.jpg',
  },
]

interface Props {}

const Wisata: NextPage<Props> = () => {
  const accessibility = React.useContext(AccessibilityContext)

  return (
    <React.Fragment>
      <Head>
        <title>Wisata Surabaya - Pemerintah Kota Surabaya</title>
        <meta name="description" content="Destinasi wisata menarik di Kota Surabaya" />
      </Head>
      <BoxStyled
        overflow="hidden"
        className={accessibility.css.negative ? 'negative' : ''}
        sx={{
          position: 'relative',
          backgroundImage: 'url(/images/bg-batik.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'contain',
          overflow: 'hidden',
          minHeight: '100vh',
          mt: '-130px',
        }}
      >
        <Layout paddingY={2}>
          <>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#006462',
                color: 'common.white',
                borderRadius: 8,
                px: 2,
                py: 1,
                fontWeight: 650,
                fontSize: { xs: 22, sm: 18 },
                letterSpacing: 1,
                boxShadow: 1,
                mb: 4,
                mt: { xs: 6, sm: 8, md: 20 },
              }}
            >
              WISATA
            </Box>
            <Box position="relative">
              <MediaHeader
                text="Wisata Surabaya"
                description="Jelajahi destinasi wisata menarik di Kota Pahlawan"
              />
              <Grid container spacing={4} marginTop={0}>
                {wisataData.map((item) => (
                  <Grid key={item.id} item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        border: '2px solid #D2B690',
                        boxShadow: '0 2px 8px rgba(0,0,0,0)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                        alt={item.title}
                        sx={{
                          objectFit: 'cover',
                        }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = '/images/placeholder-wisata.jpg'
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h2"
                          sx={{
                            fontWeight: 700,
                            fontSize: 16 + accessibility.fontSize,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: 14 + accessibility.fontSize,
                          }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        </Layout>
      </BoxStyled>
    </React.Fragment>
  )
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['contents'], async () => await getOrganization())
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Wisata
