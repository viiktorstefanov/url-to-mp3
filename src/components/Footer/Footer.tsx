import React from "react";
import { copyrights } from "../../constants/copyrights";
import styled from "styled-components";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <p>{copyrights.copyrightMessage}</p>
      <p>
        &copy; {currentYear} Copyright:{" "}
        <Link target="_blank" href={copyrights.linkedInUrl}>
          {copyrights.owner}
        </Link>
      </p>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  color: #ffffff;
`;

const Link = styled.a`
  color: #ffffff;

  &:hover {
    color: #f3d22d;
  }
`;

export default Footer;
