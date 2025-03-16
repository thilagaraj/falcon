/* eslint-disable import/no-unresolved */
import React from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { TestimonialStyleWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

function Testimonials() {
  const { users } = useSelector((state) => ({ users: state.users }));

  return (
    <>
      <PageHeader
        title="Testimonials"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <TestimonialStyleWrapper>
              <Cards headless>
                <div className="testimonial-block theme-1">
                  <h2 className="testimonial-title">Testimonial 1</h2>
                  <Swiper slidesPerView={3} spaceBetween={30} centeredSlides loop pagination={{ clickable: true }} navigation modules={[Pagination, Navigation]} breakpoints={{ 992: { slidesPerView: 3 }, 320: { slidesPerView: 1 } }}>
                    {users.map((user, index) => (
                      <SwiperSlide key={index} className="testimonial-block__single">
                        <figure>
                          <img src={require(`../../${user.img}`)} alt="" />
                          <figcaption>
                            <h2 className="client-name">{user.name}</h2>
                            <p className="client-designation">{user.designation}</p>
                            <p className="client-review">{user.content}</p>
                          </figcaption>
                        </figure>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Cards>
            </TestimonialStyleWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Testimonials;
