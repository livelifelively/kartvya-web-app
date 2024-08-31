import { Box } from '@mantine/core';
import { Expression } from '../expression/expression';

export function ExpressionListing() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((expression: any) => (
        <Box mb="xs" key={expression}>
          <Expression />
        </Box>
      ))}
    </>
  );
}
