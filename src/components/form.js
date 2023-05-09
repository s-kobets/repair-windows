import React, { useContext, useState } from "react"

import { useForm } from "react-hook-form"
import { Flex } from "@semcore/flex-box"
import Tooltip from "@semcore/tooltip"
import Input from "@semcore/input"
import Button from "@semcore/button"
import Textarea from "@semcore/textarea"
import { Text } from "@semcore/typography"
import Breakpoints from "@semcore/breakpoints"

import { SuccessForm } from "./susses-form"

const Form = () => {
  const index = useContext(Breakpoints.Context)
  const [submitForm, setSubmitForm] = useState(false)

  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    shouldFocusError: false,
  })

  const onSubmit = async (data, e) => {
    e.preventDefault()
    try {
      await fetch(`/.netlify/functions/submit-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      setSubmitForm(true)
    } catch (error) {
      console.error(error)
    } finally {
      reset({ email: "", name: "", trable: "" })
    }
  }

  return (
    <>
      <Flex
        id="contacts"
        className="container-x container-y"
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ background: "#00a3f833" }}
      >
        <Text tag="h2" mt={10}>
          Отправить запрос и получить консультацию
        </Text>

        <Flex
          tag="form"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
          name="contact"
          mt={5}
          wMax="600px"
          w="100%"
          wMin="320px"
          direction="column"
          onSubmit={handleSubmit(onSubmit)}
          position="relative"
        >
          <SuccessForm visible={submitForm} />
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact" />
          <Text size={300} tag="label" mt={5} mb={1} htmlFor="email">
            E-mail или телефон
          </Text>

          <Tooltip
            size="l"
            interaction={errors["email"] ? "focus" : "none"}
            placement={["right", "top"][index]}
            theme="warning"
            title={errors["email"]?.message}
            tag={Input}
            state={errors["email"] ? "invalid" : "normal"}
          >
            <Input.Value
              id="email"
              name="email"
              ref={register({ required: "Введите e-mail или phone" })}
            />
          </Tooltip>

          <Text size={300} tag="label" mt={10} mb={1} htmlFor="name">
            Ваше имя
          </Text>
          <Input size="l">
            <Input.Value name="name" id="name" ref={register} />
          </Input>

          <Text size={300} tag="label" mt={10} mb={1} htmlFor="trable">
            Ваша проблема
          </Text>
          <Textarea
            id="trable"
            name="trable"
            size="l"
            rows={5}
            ref={register}
          />
          <Button
            type="submit"
            size="l"
            use="primary"
            theme="info"
            mt={10}
            w="100%"
          >
            Отправить
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default Form
