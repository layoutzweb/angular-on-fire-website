export const defaults = {
    production: false,
    emulator: false,
    baseUrl: 'localhost:4200',
    basePath: '/',
    page: {
        name: 'Angular On Fire',
        title:
            'Angular On Fire: Angular Universal Development Environment ' +
            'Powered By Firebase',
        description:
            'Pre-Configured Angular Universal (SSR) Project with Firebase ' +
            'Hosting, RxJs, Cypress, Jest and Circle CI workflow.',
        social: {
            facebook: true,
            twitter: true,
        },
        githubCdnUrl:
            'https://cdn.jsdelivr.net/gh/layoutzweb/angular-on-fire@master',
    },
    firebase: {
        region: 'us-central1',
    },
}
