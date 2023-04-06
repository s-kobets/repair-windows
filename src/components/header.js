import React, { useState } from "react"
import { Flex } from "@semcore/flex-box"
import Link from "@semcore/link"
import Button from "@semcore/button"
import { List, Text } from "@semcore/typography"
import SidePanel from "@semcore/side-panel"
import Divider from "@semcore/divider"
import { StaticImage } from "gatsby-plugin-image"

const IconTelegramApp = () => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    aria-hidden="true"
    fill="#008ff8"
  >
    <path d="M19.9,3.1l-3,14.2c-0.2,1-0.8,1.3-1.7,0.8l-4.6-3.4l-2.2,2.1c-0.2,0.2-0.5,0.5-0.9,0.5l0.3-4.7L16.4,5c0.4-0.3-0.1-0.5-0.6-0.2L5.3,11.4L0.7,10c-1-0.3-1-1,0.2-1.5l17.7-6.8C19.5,1.4,20.2,1.9,19.9,3.1z"></path>{" "}
  </svg>
)
const IconWatsApp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      d="M8.25 0a7.74 7.74 0 0 0-6.9 11.27L0 16l4.96-1.24A7.75 7.75 0 1 0 8.25 0Z"
      fill="#00D16B"
    />
    <path
      d="M12.06 11.48c.22-.21.38-.48.46-.77a.56.56 0 0 0-.3-.7c-.3-.18-1.48-.8-1.48-.8a.63.63 0 0 0-.75.1l-.65.66c-.27.26-1.22-.26-2.13-1.18-.91-.9-1.44-1.86-1.18-2.12L6.7 6a.63.63 0 0 0 .1-.74s-.62-1.2-.8-1.48a.56.56 0 0 0-.7-.3c-.29.08-.56.23-.77.45-1.19 1.19-.46 3.84 1.62 5.92s4.73 2.8 5.92 1.62Z"
      fill="#fff"
    />
  </svg>
)

const Navigation = [
  { title: "О нас", href: "#about" },
  { title: "Услуги", href: "#services" },
  { title: "Выявление проблемы", href: "#testing" },
  { title: "Как мы работаем", href: "#work" },
  { title: "Цены", href: "#price" },
  { title: "Контакты", href: "#contacts" },
  { title: "Отзывы", href: "#feedback" },
]

const Header = ({ data }) => {
  const [visible, setVisible] = useState(false)
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
        <div className="is_desktop">
          <StaticImage src="../images/logo.png" alt="logo" />
        </div>

        <Button size="l" onClick={openSidePanel} theme="invert">
          Меню
        </Button>

        <Flex direction="column" className="header__phones">
          {tel
            ? tel.map(item => (
                <Flex justifyContent="center" style={{ gap: 12 }}>
                  <Link target="_blank" href={`https://wa.me/${item}`}>
                    <IconWatsApp />
                  </Link>
                  <Link target="_blank" href={`https://t.me/${item}`}>
                    <IconTelegramApp />
                  </Link>
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
                </Flex>
              ))
            : null}
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
              <List.Item key={item.title}>
                <Link size="l" my={2} href={item.href}>
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
