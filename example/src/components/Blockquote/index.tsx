export default (props: Record<string, any>) => (
  <aside
    {...props}
    sx={{
      padding: 3,
      bg: 'highlight',
      borderRadius: 4,
      borderLeft: (t) => `8px solid ${t.colors?.primary}`,
      p: {
        m: 0
      }
    }}
  />
)
