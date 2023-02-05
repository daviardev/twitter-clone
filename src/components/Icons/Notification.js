const Notification = props => {
  return (
    <>
      <svg
        viewBox='0 0 24 24'
        aria-hidden='true'
        width={24}
        height={24}
        {...props}
      >
        <g color='red'>
          <path fill='#d9d9d9' d='M19.993 9.042a8.062 8.062 0 0 0-15.996.009L2.866 18H7.1a5.002 5.002 0 0 0 9.8 0h4.236l-1.143-8.958zM12 20a3.001 3.001 0 0 1-2.829-2h5.658A3.001 3.001 0 0 1 12 20zm-6.866-4 .847-6.698a6.062 6.062 0 0 1 12.028-.007L18.864 16H5.134z' />

        </g>
      </svg>
    </>
  )
}

export default Notification
