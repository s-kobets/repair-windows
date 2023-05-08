import React from "react"
import { Flex } from "@semcore/flex-box"
import { Text } from "@semcore/typography"
import CheckAltL from "@semcore/ui/icon/CheckAlt/l"

export const SuccessForm = ({ visible, text }) => {
  if (!visible) return null

  return (
    <Flex
      position="absolute"
      alignItems="center"
      justifyContent="center"
      direction="column"
      style={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "rgba(89, 221, 170, 0.8)",
        zIndex: 1,
        gap: "16px",
      }}
    >
      <CheckAltL />
      <Text size={400}>{text ?? "Благодарим. Mы скоро с вами свяжемся"}</Text>
    </Flex>
  )
}
