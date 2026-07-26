import { render } from '@testing-library/react'
import { Container } from '../container'

describe('Container', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Container>
        <span>Test Content</span>
      </Container>
    )
    
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies custom classNames', () => {
    const { container } = render(
      <Container className="custom-test-class">
        <span>Test Content</span>
      </Container>
    )
    
    expect(container.firstChild).toHaveClass('custom-test-class')
    expect(container.firstChild).toHaveClass('mx-auto')
  })
})
