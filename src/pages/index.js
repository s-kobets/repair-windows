import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';

import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Accordion from '@semcore/accordion';
import Link from '@semcore/link';
import { Col, Row } from '@semcore/grid';
import Form from '../components/form';
import Breakpoints from '@semcore/breakpoints';
import Table from '@semcore/data-table'

import Layout from '../components/layout';
import Seo from '../components/seo';

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
        }
      }
      allContentfulRepairWindowServices{
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
      allContentfulRepairWindowPrice {
        nodes {
          name
          price
        }
      }
    }
  `);

  const contact =
    data.contentfulRepairWindows.childContentfulRepairWindowsContactJsonNode;

  return (
    <Layout>
      <Seo
        title="Ремонт окон, Санкт Петербург"
        description="Качественно, недорого"
        lang="ru"
        keywords="ремонт, окна, Санкт Петербург"
      />

      <Flex
        position="relative"
        className="container-x image-block"
        w="100%"
        style={{
          textAlign: 'center',
        }}
      >
        <StaticImage
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            filter: 'brightness(50%)'
          }}
          width="100%" height="100%" src="../images/slide_1.jpg" alt="slide_1"
        />
        <Text
          tag="h2"
          size={[800, 700][index]}
          color="white"
          bold
          direction="column"
          m="auto"
        >
          {data.contentfulRepairWindows?.title}
          <Text tag="p" className="custom-description" mt={4} textAlign='left' size={[600, 500][index]}>
            {data.contentfulRepairWindows?.description?.description}
          </Text>
        </Text>
      </Flex>

      {/* Services */}
      <Flex
        id="services"
        className="container-x container-y"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box w={156} h={156}>
          <StaticImage src="../images/service.jpg" alt="service" />
        </Box>

        <Text tag="h2" my={10}>
          Оказываемые услуги
        </Text>

        <Box
          wMax="600px"
          style={{
            borderBottom: '1px solid #eeeeee',
          }}
        >
          <Accordion>
            {data.allContentfulRepairWindowServices.nodes.map((item) => (
              <Accordion.Item value={item.title} key={item.title}>
                <Accordion.Item.Toggle
                  position="relative"
                  tag={Flex}
                  p="27px 50px 27px 0"
                  alignItems="center"
                  style={{
                    borderTop: '1px solid #eeeeee',
                  }}
                >
                  <Text size={400} bold>
                    {item.title}
                  </Text>
                  <Accordion.Item.Chevron
                    position="absolute"
                    right="0"
                    color="stone"
                    mr={2}
                    tag="svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="none"
                      stroke-width="1px"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="square"
                    >
                      <g
                        transform="translate(1.000000, 1.000000)"
                        stroke="#bd9840"
                      >
                        <path d="M0,11 L22,11"></path>
                        <path d="M11,0 L11,22"></path>
                      </g>
                    </g>
                  </Accordion.Item.Chevron>
                </Accordion.Item.Toggle>
                <Accordion.Item.Collapse>
                  <Text
                    tag="pre"
                    size={300}
                    style={{ whiteSpace: 'break-spaces' }}
                  >
                    {item.description.description}
                  </Text>
                </Accordion.Item.Collapse>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>
      </Flex>

      {/* Advantages */}
      <Flex
        id="work"
        className="container-x container-y"
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ background: 'antiquewhite' }}
      >
        <Text tag="h2" mt={10}>
          Как мы работаем
        </Text>

        <Row gutter={10} mt={10} justifyContent="center">
          {data.allContentfulRepairWindowWork.nodes.map((item) => (
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
                style={{ borderRadius: '50%', overflow: 'hidden' }}
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

        <Table use="secondary" wMin="100%" mt={10} data={data.allContentfulRepairWindowPrice.nodes}>
          <Table.Head>
            <Table.Column name="name" children="Наименование работ" />
            <Table.Column name="price" children="Цена" />
          </Table.Head>
          <Table.Body>
            <Table.Row>
              {(props, row, index) => {
                if (index % 2) {
                  return {
                    theme: 'info'
                  };
                }
              }}
            </Table.Row>
          </Table.Body>
        </Table>
      </Flex>

      {/* Form */}
      <Form />

      {/* Footer */}
      <Row tag={Flex}>
        <Col md={6} sm={12} xs={12} mb={0} w="100%" h="400px" p={0}>
          <Box
            tag="iframe"
            width="100%"
            height="100%"
            mb={0}
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A86509c5e003e91f40711b96e38b482d83c20e0a750175436c1f5f7d827e30888&amp;source=constructor"
            frameborder="0"
          />
        </Col>
        <Col
          tag={Flex}
          span={6}
          sm={12}
          xs={12}
          p={10}
          direction="column"
          style={{ backgroundColor: '#303030', color: '#fff' }}
        >
          <Text size={400} bold mb={2}>
            {contact.fullName}
          </Text>
          <Text>
            Моб.:{' '}
            <Link color="orange" href={`tel:${contact.tel}`}>
              {contact.tel}
            </Link>
          </Text>
          <Text>
            Viber:{' '}
            <Link color="orange" href={`viber:${contact.tel}`}>
              {contact.tel}
            </Link>
          </Text>
          <Text>
            E-mail:{' '}
            <Link color="orange" href={`mailto:${contact.email}`}>
              {contact.email}
            </Link>
          </Text>
          <Text>
            Skype:{' '}
            <Link color="orange" href={`skype:${contact.skype}`}>
              {contact.skype}
            </Link>
          </Text>
          <Text size={100} mt={4}>
            Если Ваш телефонный звонок остался без ответа, то это значит, что я
            занят, и при возможности сразу же Вам перезвоню.
            <br /> P.S. Если же я Вам не перезвонил, наберите мой номер еще раз.
          </Text>
        </Col>
      </Row>
    </Layout>
  );
};

const IndexPage = (props) => {
  const [index, updateIndex] = useState(Breakpoints.mediaList.matches());

  useEffect(() => {
    const unsubscribe = Breakpoints.mediaList.addListener((index) => {
      updateIndex(index);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <IndexInnerPage {...props} index={index} />;
};

export default IndexPage;
