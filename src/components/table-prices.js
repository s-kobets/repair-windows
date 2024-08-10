import React, { useState } from "react"
import DataTable from "@semcore/data-table"
import Accordion from "@semcore/accordion"
import { Flex } from "@semcore/flex-box"
import prices from "../prices.json"

function getDataFromJSON(json) {
  return Object.keys(json.data).reduce((acc, name) => {
    if (typeof json.data[name] === "object") {
      return [
        ...acc,
        { name, price: "", items: getDataFromJSON({ data: json.data[name] }) },
      ]
    }
    return [...acc, { name, price: json.data[name] }]
  }, [])
}
const data = getDataFromJSON(prices)

const RowAccordion = React.forwardRef(function ({ value, ...props }, ref) {
  if (value.items) {
    return (
      <Accordion.Item value={value.name} ref={ref}>
        <Accordion.Item.Toggle
          active={props.active}
          children={<Flex className={props.className}>{props.children}</Flex>}
        />
        <Accordion.Item.Collapse>
          <DataTable data={value.items}>
            <DataTable.Head style={{ height: 0 }}>
              <DataTable.Column name="name" children="" />
              <DataTable.Column name="price" children="" />
            </DataTable.Head>
            <DataTable.Body>
              <DataTable.Row>
                {(props, row, ind) => ({ theme: ind % 2 !== 0 ? "info" : "" })}
              </DataTable.Row>
            </DataTable.Body>
          </DataTable>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    )
  }
  return <Flex className={props.className}>{props.children}</Flex>
})

export const TablePrices = () => {
  const [value, setValue] = useState(["Популярные услуги"])
  return (
    <Accordion value={value} onChange={setValue}>
      <DataTable use="secondary" mt={10} wMax="800px" w="100%" data={data}>
        <DataTable.Head>
          <DataTable.Column name="name" children="Наименование работ" />
          <DataTable.Column name="price" children="Цена" />
        </DataTable.Head>
        <DataTable.Body>
          <DataTable.Row tag={RowAccordion}>
            {(props, row, index) => {
              return {
                value: row,
                active: value.includes(index),
                theme: index % 2 === 0 || row.items ? "info" : "",
              }
            }}
          </DataTable.Row>
          <DataTable.Cell name="name">
            {(props, row, index) => {
              return {
                children: row.items ? (
                  <Flex alignItems="center">
                    <Accordion.Item.Chevron color="stone" mr={2} />
                    {props.children}
                  </Flex>
                ) : (
                  props.children
                ),
              }
            }}
          </DataTable.Cell>
        </DataTable.Body>
      </DataTable>
    </Accordion>
  )
}
