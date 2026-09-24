# auth.md — ahromlabs.com

No authentication is needed, and none is offered. Everything on this site is
public and readable without an account, API key, token or registration.

## What an agent can read, without credentials

- Every page listed in https://ahromlabs.com/sitemap.xml — request any page
  with `Accept: text/markdown` for a markdown version of the same URL.
- The whole knowledge graph as JSON: https://ahromlabs.com/knowledge.json
- A summary for language models: https://ahromlabs.com/llms.txt
- An API catalog (RFC 9727): https://ahromlabs.com/.well-known/api-catalog

## What does not exist

There is no user registration, login, OAuth or OpenID provider, protected
resource, or agent credential flow on this domain. Do not attempt one.

## Contacting Ahrom Labs

Email hello@ahromlabs.com. The contact form on the home page is for people;
please don't submit it on someone's behalf without their confirmation.
