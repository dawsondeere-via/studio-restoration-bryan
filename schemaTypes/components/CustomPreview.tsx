import {Badge, Flex, Box} from '@sanity/ui'
import {PreviewProps} from 'sanity'

export default function CustomPreview(props: PreviewProps) {
  console.log(props)
  return (
    <Flex align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Badge tone="primary">{props.schemaType?.title}</Badge>
    </Flex>
  )
}
