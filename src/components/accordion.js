export const Accordion = ({ nodes }) => (
  <Accordion>
    {dnodes.map(item => (
      <Accordion.Item value={item.title} key={item.title}>
        <Accordion.Item.Toggle
          position="relative"
          tag={Flex}
          p="27px 50px 27px 0"
          alignItems="center"
          style={{
            borderTop: "1px solid #eeeeee",
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
              <g transform="translate(1.000000, 1.000000)" stroke="#bd9840">
                <path d="M0,11 L22,11"></path>
                <path d="M11,0 L11,22"></path>
              </g>
            </g>
          </Accordion.Item.Chevron>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse>
          <Text tag="pre" size={300} style={{ whiteSpace: "break-spaces" }}>
            {item.description.description}
          </Text>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    ))}
  </Accordion>
)
