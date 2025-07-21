/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["team08-funfun.s3.ap-northeast-2.amazonaws.com",
      "example.com",
      'www.kopis.or.kr'
    ],
  },
};

module.exports = nextConfig;
