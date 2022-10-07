import React, { useState, useContext } from 'react';
import { Flex, Box } from '@semcore/flex-box';
import Link from '@semcore/link';
import Button from '@semcore/button';
import Sticky from '@semcore/sticky';
import { List, Text } from '@semcore/typography';
import SidePanel from '@semcore/side-panel';
import Divider from '@semcore/divider';
import Breakpoints from '@semcore/breakpoints';
import { StaticImage } from 'gatsby-plugin-image';

import HamburgerM from '@semcore/icon/lib/Hamburger/m';

const Navigation = [
  { title: 'Услуги', href: '#services' },
  { title: 'Как мы работаем', href: '#work' },
  { title: 'Контакты', href: '#contacts' },
];

const Header = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const index = useContext(Breakpoints.Context);
  const { tel, description, fullName, location } = data;
  const onVisiblePanel = (visible) => {
    setVisible(visible);
  };

  const openSidePanel = (e) => {
    e.preventDefault();
    onVisiblePanel(true);
  };

  const closeSidePanel = () => {
    onVisiblePanel(false);
  };

  const isDesktop = index === 0;

  return (
    <>
      <Sticky zIndex={2}>
        <Flex
          className="container-x"
          h="80px"
          alignItems="center"
          justifyContent="space-between"
          style={{
            backgroundColor: '#fff',
            color: '#000',
            boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 16px 0px',
          }}
        >
          {isDesktop && (
            <>
              <Flex direction="column">
                <StaticImage src="../images/logo.png" alt="logo" />
              </Flex>

              <Box tag="nav">
                {Navigation.map((item) => (
                  <Link px={4} key={item.title} href={item.href}>
                    {item.title}
                  </Link>
                ))}
              </Box>
            </>
          )}

          {!isDesktop && (
            <Button size="l" onClick={openSidePanel}>
              <Button.Addon tag={HamburgerM} />
            </Button>
          )}

          <Link tag="a" href={`tel:${tel}`} size={400}>
            {tel}
          </Link>
        </Flex>
      </Sticky>
      <SidePanel placement="left" visible={visible} onClose={closeSidePanel}>
        <Flex direction="column">
          <Text size={400} bold>
            {fullName}
          </Text>
        </Flex>
        <List size={400} mt={5} marker={null} onClick={closeSidePanel}>
          {Navigation.map((item, ind) => (
            <>
              <List.Item>
                <Link size="l" my={2} key={item.title} href={item.href}>
                  {item.title}
                </Link>
              </List.Item>
              {ind < Navigation.length - 1 && <Divider my={2} />}
            </>
          ))}
        </List>
      </SidePanel>
    </>
  );
};

export default Header;
