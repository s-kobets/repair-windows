import React, { useContext, useEffect, useState } from "react"

import { useForm } from "react-hook-form"
import { Flex } from "@semcore/flex-box"
import Tooltip from "@semcore/tooltip"
import Textarea from "@semcore/textarea"
import { Text } from "@semcore/typography"
import { Col, Row } from "@semcore/grid"
import Breakpoints from "@semcore/breakpoints"
import Button from "@semcore/button"
import Input from "@semcore/input"
import Carousel from "@semcore/carousel"
import dayjs from "dayjs"

import { SuccessForm } from "./susses-form"

const Feedback = () => {
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
      reset({ name: "", feedback: "" })
    }
  }

  const [feedbackList, setFeedbackList] = useState([])

  useEffect(() => {
    fetch("/.netlify/functions/get-feedback")
      .then(res => res.json())
      .then(res => {
        setFeedbackList(res.records)
      })
  }, [])

  return (
    <Flex
      id="feedback"
      className="container-x container-y"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text tag="h2" mt={10}>
        Отзывы
      </Text>

      <Carousel w="100%" my={8}>
        <Flex>
          <Carousel.Prev />
          <Carousel.Container>
            {feedbackList.map(item => (
              <Carousel.Item key={item.id} px={9}>
                <i>{dayjs(item.createTime).format("DD/MM/YYYY")}</i>
                <strong style={{ display: "inline-block", marginLeft: "8px" }}>
                  {item.fields.name}
                </strong>
                <Text tag="p" mt={1}>
                  {item.fields.feedback}
                </Text>
              </Carousel.Item>
            ))}
          </Carousel.Container>
          <Carousel.Next />
        </Flex>
        <Carousel.Indicators />
      </Carousel>

      <Row gutter={10} mt={10} justifyContent="center">
        <Col
          span={4}
          sm={6}
          xs={12}
          flex={1}
          mt="20px"
          direction="column"
          tag={Flex}
          wMax="320px"
        >
          <Flex
            style={{
              border: "1px solid #c4c7cf",
              borderRadius: "6px",
              textAlign: "center",
              backgroundColor: "#f0f0f0",
            }}
            p={2}
            h="100%"
            alignItems="center"
          >
            Оставьте отзыв и получите персональную скидку или бесплатную
            консультацию
          </Flex>
        </Col>
        <Flex
          tag="form"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
          name="contact"
          wMin="320px"
          direction="column"
          position="relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SuccessForm visible={submitForm} />
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact" />
          <Text size={300} tag="label" mt={10} mb={1} htmlFor="name">
            Ваше имя
          </Text>
          <Input size="l">
            <Input.Value name="name" id="name" ref={register} />
          </Input>

          <Text size={300} tag="label" mt={5} mb={1} htmlFor="feedback">
            Комментарий
          </Text>
          <Tooltip
            interaction={errors["feedback"] ? "focus" : "none"}
            placement={["right", "top"][index]}
            theme="warning"
            title={errors["feedback"]?.message}
          >
            <Textarea
              id="feedback"
              name="feedback"
              ref={register({ required: "Оставьте отзыв" })}
              state={errors["feedback"] ? "invalid" : "normal"}
              rows={4}
            />
          </Tooltip>
          <Button type="submit" size="l" use="primary" theme="info" mt={10}>
            Отправить
          </Button>
        </Flex>
      </Row>
    </Flex>
  )
}

export default Feedback
