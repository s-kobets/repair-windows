import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"

import { Flex, Box } from "@semcore/flex-box"
import { Text } from "@semcore/typography"
import Button from "@semcore/button"
import Link from "@semcore/link"
import { Col, Row } from "@semcore/grid"
import Form from "../components/form"
import Breakpoints from "@semcore/breakpoints"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { TablePrices } from "../components/table-prices"

const IndexInnerPage = ({ index }) => {
  const data = useStaticQuery(graphql`
    query Site {
      contentfulRepairWindows {
        title
        description {
          description
        }
        childContentfulRepairWindowsContactJsonNode {
          fullName
          email
          skype
          tel
          description
          legal
        }
      }
      allContentfulRepairWindowServices {
        nodes {
          title
          description {
            description
          }
        }
      }
      allContentfulRepairWindowWork {
        nodes {
          title
          description {
            description
          }
          icon {
            gatsbyImageData
          }
        }
      }
      allContentfulRepairWindowAbout {
        nodes {
          title
          description {
            description
          }
        }
      }
      allContentfulRepaireWindowsTesting {
        nodes {
          title
          description {
            description
          }
        }
      }
    }
  `)

  const contact =
    data.contentfulRepairWindows.childContentfulRepairWindowsContactJsonNode

  const about = data.allContentfulRepairWindowAbout.nodes[0]
  const testing = data.allContentfulRepaireWindowsTesting.nodes[0]

  return (
    <Layout>
      <Seo
        title="Ремонт окон, Москва, Санкт Петербург"
        description="Качественно, недорого"
        lang="ru"
        keywords="ремонт, окна, Москва, Санкт Петербург"
      />

      <Flex
        position="relative"
        className="container-x image-block"
        w="100%"
        pt={40}
        style={{
          textAlign: "center",
        }}
      >
        <StaticImage
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            filter: "brightness(50%)",
          }}
          width="100%"
          height="100%"
          src="../images/slide_1.jpg"
          alt="slide_1"
        />
        <Text
          tag="h2"
          size={[800, 700][index]}
          color="white"
          bold
          direction="column"
          m="auto"
          style={{ wordBreak: "break-word" }}
        >
          {data.contentfulRepairWindows?.title}
          <Text
            tag="p"
            className="custom-description"
            mt={4}
            textAlign="left"
            size={[600, 500][index]}
          >
            {data.contentfulRepairWindows?.description?.description}
          </Text>
        </Text>
      </Flex>

      {/* About */}
      <Flex id="about" className="container-x container-y">
        <Box w="100%" wMax="800px">
          <Text tag="h2" mb={10}>
            {about.title}
          </Text>
          <Text tag="pre" size={400} style={{ whiteSpace: "break-spaces" }}>
            {about.description.description}
          </Text>
        </Box>

        <Box w="40%" className="about__image is_desktop">
          <StaticImage height="100%" src="../images/about.jpg" alt="about" />
        </Box>
      </Flex>

      {/* Services */}
      <Flex
        id="services"
        className="container-x container-y"
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <Box w={156} h={156}>
          <StaticImage src="../images/service.jpg" alt="service" />
        </Box>

        <Text tag="h2" mt={10}>
          Оказываемые услуги
        </Text>

        <Row gutter={10} justifyContent="center">
          {data.allContentfulRepairWindowServices.nodes.map(item => (
            <Col span={4} sm={6} xs={12} wMax="320px" mt={10} key={item.title}>
              <Flex
                h="150px"
                p={4}
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                style={{
                  border: "1px solid gray",
                  borderRadius: "4px",
                }}
              >
                <Text textAlign="center" size={400} bold>
                  {item.title}
                </Text>
                <Button tag="a" href="#contacts" size="l" use="primary">
                  Заказать
                </Button>
              </Flex>
            </Col>
          ))}
        </Row>
      </Flex>

      {/* Testing */}
      <Flex
        id="testing"
        className="container-x container-y"
        direction="column"
        wMax="600px"
        m="0 auto"
      >
        <Text tag="h2" mb={10}>
          {testing.title}
        </Text>

        <Text tag="pre" size={400} style={{ whiteSpace: "break-spaces" }}>
          {testing.description.description}
        </Text>
      </Flex>

      {/* Advantages */}
      <Flex
        id="work"
        className="container-x container-y"
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ background: "#00a3f833" }}
      >
        <Text tag="h2" mt={10}>
          Как мы работаем
        </Text>

        <Row gutter={10} mt={10} justifyContent="center">
          {data.allContentfulRepairWindowWork.nodes.reverse().map(item => (
            <Col
              span={4}
              sm={6}
              xs={12}
              mt="20px"
              key={item.title}
              direction="column"
              alignItems="center"
              justifyContent="center"
              tag={Flex}
              wMax="320px"
            >
              <Box
                w="100px"
                h="100px"
                style={{ borderRadius: "50%", overflow: "hidden" }}
              >
                <GatsbyImage
                  image={getImage(item.icon.gatsbyImageData)}
                  alt={item.title}
                />
              </Box>
              <Text textAlign="center" size={400} my={3} bold>
                {item.title}
              </Text>
              <Text textAlign="center" size={300}>
                {item.description?.description}
              </Text>
            </Col>
          ))}
        </Row>
      </Flex>

      {/* Block */}
      <Flex
        id="price"
        className="container-x container-y"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text tag="h2" mt={10}>
          Наши цены
        </Text>

        <TablePrices />
      </Flex>

      {/* Form */}
      <Form />

      {/* Footer */}
      <Flex
        p={10}
        direction="column"
        style={{ backgroundColor: "#303030", color: "#fff" }}
      >
        <Text size={400} bold mb={2}>
          {contact.fullName}
        </Text>
        <Flex alignItems="center" mb={2} style={{ flexWrap: "wrap" }}>
          <Text>Телефон/Telegram:</Text>
          {contact.tel.map(tel => (
            <>
              <Link key={tel} ml={2} color="orange" href={`tel:${tel}`}>
                {tel}
              </Link>
            </>
          ))}
        </Flex>
        <Text size={200}>{contact.legal}</Text>
        {/* <Text>
          E-mail:{" "}
          <Link color="orange" href={`mailto:${contact.email}`}>
            {contact.email}
          </Link>
        </Text>
        <Text>
          Skype:{" "}
          <Link color="orange" href={`skype:${contact.skype}`}>
            {contact.skype}
          </Link>
        </Text> */}
        <Text size={100} mt={4}>
          Если Ваш телефонный звонок остался без ответа, то это значит, что мы
          заняты, и при возможности сразу же Вам перезвоним.
          <br />
        </Text>
      </Flex>
    </Layout>
  )
}

const IndexPage = props => {
  const [index, updateIndex] = useState(Breakpoints.mediaList.matches())

  useEffect(() => {
    const unsubscribe = Breakpoints.mediaList.addListener(index => {
      updateIndex(index)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return <IndexInnerPage {...props} index={index} />
}

export default IndexPage
