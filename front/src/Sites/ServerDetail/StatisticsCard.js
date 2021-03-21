import React, {useEffect} from "react";
import {ResponsiveLine} from '@nivo/line';
import {ResponsiveCalendar} from '@nivo/calendar';
import {CalendarMockData, LineChart1Data, LineChart2Data} from "../../Mock/serverStat";
import moment from 'moment';


const StatisticsCard = ({hourStat, dayStat, yearStat, ...props}) => {
  useEffect(() => {
    console.log('AAAAAAAAAAAAAAAAa')
  }, [])

  let stat1h = JSON.parse(JSON.stringify(hourStat)).reverse();
  let stat24h = JSON.parse(JSON.stringify(dayStat)).reverse();
  console.log(yearStat.map((item) => {return {day: moment(item.date).format('YYYY-MM-DD'), value: item.playersOnline}}))
  return (
    <div className={props.className}>
      <div className="row mb-3">
        <div className="p-0 col-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-1">Players Online:</h3>
              <h5 className="mb-1 font-weight-normal">Year / 1day Step</h5>
              <div className="w-100" style={{height: '400px'}}>
                <MemoizedMyResponsiveCalendar
                  data={yearStat.map((item) => {return {day: moment(item.date).format('YYYY-MM-DD'), value: item.playersOnline}})}
                  from={moment().startOf('year').format('YYYY-MM-DD')}
                  to={moment().endOf('year').format('YYYY-MM-DD')}

                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 p-0">
          <div className="card">
            <div className="card-body">
              <img src="https://otservlist.org/html/images/banners/d9c306f68886258c6425d4fe.png" alt="" width="100%"/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 p-0 pr-2 h-100">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title mb-1">Players Online:</h3>
              <h5 className="mb-1 font-weight-normal">2h / 5min Step</h5>
              <div className="w-100" style={{height: '500px'}}>
                <MyResponsiveLine
                  data={[
                    {
                      "id": "Players",
                      "color": "hsl(164, 70%, 50%)",
                      "data": stat1h.map((item) => {return {x: moment(item.date).format('DD.MM.YYYY HH:mm'), y: item.playersOnline}})
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 p-0 pl-2 h-100">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title mb-1">Players Online:</h3>
              <h5 className="mb-1 font-weight-normal">24h / 1h Step</h5>
              <div className="w-100" style={{height: '500px'}}>
                <MyResponsiveLine
                  data={[
                    {
                      "id": "Players",
                      "color": "hsl(164, 70%, 50%)",
                      "data": stat24h.map((item) => {return {x: moment(item.date).format('DD.MM.YYYY HH:mm'), y: item.playersOnline}})
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        {/*<div className="col-5 p-0">*/}
        {/*  <div className="card">*/}
        {/*    <div className="card-body">*/}
        {/*      <img src="https://otservlist.org/html/images/banners/d9c306f68886258c6425d4fe.png" alt="" width="100%"/>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

const MyResponsiveLine = ({data /* see data tab */}) => (
  <ResponsiveLine
    data={data}
    margin={{top: 50, right: 110, bottom: 20, left: 60}}
    xScale={{type: 'point'}}
    yScale={{type: 'linear', stacked: true, reverse: false}}
    yFormat=" >-.2f"
    curve="linear"
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0
    }}
    colors={{scheme: 'accent'}}
    pointSize={10}
    pointColor={{theme: 'background'}}
    pointBorderWidth={2}
    pointBorderColor={{from: 'serieColor', modifiers: []}}
    pointLabelYOffset={-12}
    enableArea={true}
    areaBlendMode="multiply"
    useMesh={true}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
);

const MyResponsiveCalendar = ({data, from, to}) => (
  <ResponsiveCalendar
    data={data}
    from={from}
    to={to}
    emptyColor="#eeeeee"
    colors={[
      "#d3ffcc",
      "#afffa3",
      "#8cff7a",
      "#69ff52",
      "#45ff29",
      "#22ff00",
      "#1dd600",
      "#17ad00",
      "#128500",
      "#0c5c00"
    ]}
    margin={{top: -40, right: 40, bottom: 40, left: 40}}
    monthBorderColor="#b0b0b0"
    dayBorderWidth={2}
    dayBorderColor="#ffffff"
    legends={[
      {
        anchor: 'bottom-left',
        direction: 'row',
        translateY: -15,
        itemCount: 12,
        itemWidth: 60,
        itemHeight: 36,
        itemsSpacing: 0,
        itemDirection: 'left-to-right'
      }
    ]}
  />
)
const MemoizedMyResponsiveCalendar = React.memo(MyResponsiveCalendar, ()=>true)

export default StatisticsCard;
