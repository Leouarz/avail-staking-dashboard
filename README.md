[![License](https://img.shields.io/badge/License-GPL3.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)

# Avail Staking Dashboard

![image](https://github.com/Leouarz/avail-staking-dashboard/assets/15839293/29f683da-67bb-4f00-afee-467286ab8ece)

## Contributing Community Assets

The Avail Staking Dashboard is a fork from the Polkadot Staking Dashboard, a community-driven project, and we welcome contributions to bolster the dashboard's functionality and features.

## URL Variable Support

Avail Staking Dashboard supports URL variables that can be used to direct users to specific configurations of the app, such as landing on a specific language or on a specific network. Variables are added at the end of the hash portion of URL.

The currently supported URL variables are as follows:

- **n**: Controls the default network to connect to upon visiting the dashboard. Supported values are `avail`.
- **l**: Controls the default to use upon visiting the dashboard. Supported values are `en` and `cn`.
- **a**: Controls the account to connect to upon visiting the dashboard. Ignored if the account is not present in the initial imported accounts.

URL variables take precedence over saved values in local storage, and will overwrite current configurations. URL variables will update (if present) as a user switches configurations in-app, such as changing the network or language.

### Example URL:

The following URL will load Avail and use the English localisation resource:

```
staking.goldberg.avail.tools/#/overview?n=avail&l=en
```

## Using Containers

You may build a container using:

```
./shell/build-container.sh
```

Then run your container with:

```
podman run --d -p 8080:80 localhost/avail-staking-dashboard
```

<!-- markdown-link-check-disable -->

And access the **Staking Dashboard** at http://localhost:8080/.

## Presentations of the Polkadot Staking Dashboard

- 29/06/2023: [[Video] Polkadot Decoded 2023: The Next Step of the Polkadot UX Journey](https://www.youtube.com/watch?v=s78SZZ_ZA64)
- 30/06/2022: [[Video] Polkadot Decoded 2022: Polkadot Staking Dashboard Demo](https://youtu.be/H1WGu6mf1Ls)
