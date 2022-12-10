import React, { useState, useContext } from "react"
import { Flex } from "@semcore/flex-box"
import Link from "@semcore/link"
import Button from "@semcore/button"
import { List, Text } from "@semcore/typography"
import SidePanel from "@semcore/side-panel"
import Divider from "@semcore/divider"
import Breakpoints from "@semcore/breakpoints"
import { StaticImage } from "gatsby-plugin-image"

const Navigation = [
  { title: "О нас", href: "#about" },
  { title: "Услуги", href: "#services" },
  { title: "Выявление проблемы", href: "#testing" },
  { title: "Как мы работаем", href: "#work" },
  { title: "Контакты", href: "#contacts" },
]

const Header = ({ data }) => {
  const [visible, setVisible] = useState(false)
  const index = useContext(Breakpoints.Context)
  const { tel = [], fullName } = data
  const onVisiblePanel = visible => {
    setVisible(visible)
  }

  const openSidePanel = e => {
    e.preventDefault()
    onVisiblePanel(true)
  }

  const closeSidePanel = () => {
    onVisiblePanel(false)
  }

  const isDesktop = index === 0

  return (
    <>
      <Flex
        className="container-x"
        h="80px"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        style={{
          position: "fixed",
          top: 0,
          backgroundColor: "rgb(0,0,0,0.6)",
          color: "white",
          boxShadow: "rgb(0 0 0 / 10%) 0px 2px 16px 0px",
          zIndex: 2,
        }}
      >
        {isDesktop && (
          <div>
            <StaticImage src="../images/logo.png" alt="logo" />
          </div>
        )}

        <Button size="l" onClick={openSidePanel} theme="invert">
          Меню
        </Button>

        <Flex direction="column" w="50%" style={{ textAlign: "center" }}>
          {tel.map(item => (
            <Link
              key={item}
              tag="a"
              href={`tel:${item}`}
              size={400}
              color="white"
              bold
            >
              {item}
            </Link>
          ))}
        </Flex>

        <Button tag="a" href="#contacts" size="l" theme="invert">
          Заказать звонок
        </Button>
      </Flex>

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
  )
}

export default Header
