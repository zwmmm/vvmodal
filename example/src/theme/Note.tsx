/** @jsxImportSource theme-ui */

import React from 'react'

export default function (props: React.ComponentProps<any>) {
  return (
    <aside
      {...props}
      sx={{
        padding: 3,
        bg: '#efeffe',
        borderRadius: 4,
        borderLeft: (t: any) => `8px solid #3333ee`,
        p: {
          m: 0
        },
        marginBottom: 2
      }}
    />
  )
}
