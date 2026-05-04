import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { useRouter } from "next/navigation"
import LoginPage from "@/app/login/page"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

// Mock auth context
jest.mock("@/contexts/auth.context", () => ({
  useAuth: jest.fn(),
}))

describe("LoginPage", () => {
  const mockPush = jest.fn()
  const mockLogin = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  })

  it("renders login form with email and password fields", () => {
    const { useAuth } = require("@/contexts/auth.context")
    ;(useAuth as jest.Mock).mockReturnValue({ user: null, login: mockLogin })

    render(<LoginPage />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("prevents submission when email is empty", async () => {
    const { useAuth } = require("@/contexts/auth.context")
    ;(useAuth as jest.Mock).mockReturnValue({ user: null, login: mockLogin })

    render(<LoginPage />)

    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole("button", { name: /sign in/i })

    // Fill only password, leave email empty
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    
    // Form should not call login when email is empty (HTML5 validation)
    fireEvent.click(signInButton)

    // login should not be called because email is required by HTML5
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it("calls login with email and password on submit", async () => {
    const { useAuth } = require("@/contexts/auth.context")
    ;(useAuth as jest.Mock).mockReturnValue({ user: null, login: mockLogin })

    render(<LoginPage />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123")
    })
  })

  it("shows error message on login failure", async () => {
    const { useAuth } = require("@/contexts/auth.context")
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: jest.fn().mockRejectedValue(new Error("Invalid credentials")),
    })

    render(<LoginPage />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "bad@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "wrongpass" } })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  it("redirects admin users to /admin on successful login", async () => {
    const { useAuth } = require("@/contexts/auth.context")
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: jest.fn().mockImplementation(() => {
        // Simulate successful login by updating mock
        ;(useAuth as jest.Mock).mockReturnValue({
          user: { id: "1", email: "admin@example.com", name: "Admin", role: "admin" },
          login: mockLogin,
        })
        return Promise.resolve()
      }),
    })

    render(<LoginPage />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "admin@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "adminpass" } })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/admin")
    })
  })

  it("redirects doctor users to /admin/doctors on successful login", async () => {
    const { useAuth } = require("@/contexts/auth.context")
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: jest.fn().mockImplementation(() => {
        ;(useAuth as jest.Mock).mockReturnValue({
          user: { id: "2", email: "doctor@example.com", name: "Doctor", role: "doctor" },
          login: mockLogin,
        })
        return Promise.resolve()
      }),
    })

    render(<LoginPage />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "doctor@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "doctorpass" } })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/admin/doctors")
    })
  })

  it("redirects patient users to home page on successful login", async () => {
    const { useAuth } = require("@/contexts/auth.context")
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: jest.fn().mockImplementation(() => {
        ;(useAuth as jest.Mock).mockReturnValue({
          user: { id: "3", email: "patient@example.com", name: "Patient", role: "patient" },
          login: mockLogin,
        })
        return Promise.resolve()
      }),
    })

    render(<LoginPage />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "patient@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "patientpass" } })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/")
    })
  })

  it("shows loading state while logging in", async () => {
    let resolveLogin: () => void
    const loginPromise = new Promise<void>((resolve) => {
      resolveLogin = resolve
    })

    const { useAuth } = require("@/contexts/auth.context")
    ;(useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: jest.fn().mockReturnValue(loginPromise),
    })

    render(<LoginPage />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.click(signInButton)

    // Both buttons should be disabled during loading
    const allButtons = screen.getAllByRole("button")
    allButtons.forEach(button => {
      expect(button).toBeDisabled()
    })

    // Resolve the login
    resolveLogin!()
  })

  it("has link to booking page for non-authenticated users", () => {
    const { useAuth } = require("@/contexts/auth.context")
    ;(useAuth as jest.Mock).mockReturnValue({ user: null, login: mockLogin })

    render(<LoginPage />)

    const bookingLink = screen.getByRole("link", { name: /book an appointment/i })
    expect(bookingLink).toHaveAttribute("href", "/booking")
  })
})
