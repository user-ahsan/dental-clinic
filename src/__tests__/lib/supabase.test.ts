/**
 * @supabase/client.ts
 *
 * Test the actual Supabase client initialization.
 * These tests verify that the client is created correctly with proper configuration.
 */

/* eslint-disable @typescript-eslint/no-require-imports */

// Mock the environment variables for testing
const originalEnv = process.env;

describe('Supabase Client', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: 'https://test-project.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key-12345',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('creates a Supabase client successfully with valid env vars', () => {
    // Re-require to pick up mocked env vars
    jest.resetModules();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-project.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key-12345';

    const { createClient } = require('@/lib/supabase/client');
    const client = createClient();

    expect(client).toBeDefined();
    expect(client).toHaveProperty('auth');
    expect(client).toHaveProperty('from');
    expect(client).toHaveProperty('rpc');
  });

  it('throws error when NEXT_PUBLIC_SUPABASE_URL is missing', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;

    expect(() => {
      jest.resetModules();
      require('@/lib/supabase/client');
    }).toThrow('Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL');
  });

  it('throws error when NEXT_PUBLIC_SUPABASE_ANON_KEY is missing', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    expect(() => {
      jest.resetModules();
      require('@/lib/supabase/client');
    }).toThrow('Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
  });

  it('throws error when both env vars are missing', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    expect(() => {
      jest.resetModules();
      require('@/lib/supabase/client');
    }).toThrow('Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL');
  });

  it('client has expected Supabase client methods', () => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-project.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key-12345';

    const { createClient } = require('@/lib/supabase/client');
    const client = createClient();

    // Verify client has required Supabase methods
    expect(typeof client.auth).toBe('object');
    expect(typeof client.from).toBe('function');
    expect(typeof client.rpc).toBe('function');
    expect(typeof client.storage).toBe('object');
  });
});
