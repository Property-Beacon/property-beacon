import TabContentLoading from './TabContentLoading'

const SettingsPageLoading = () => (
  <div>
    <div className="card shadow-lg bg-base-100 max-w-2xl">
      <div className="flex-col-reverse sm:flex-row place-items-center gap-6 card-body">
        <div className="flex-grow text-center sm:text-left w-full sm:w-auto">
          <div className="bg-base-300 animate-pulse h-10 mb-3 rounded w-1/2 mx-auto sm:mx-0"></div>
          <div className="bg-base-300 animate-pulse h-6 mb-4 rounded w-1/2 mx-auto sm:mx-0"></div>
          <div className="bg-base-300 animate-pulse h-4 mb-1 rounded w-2/3 mx-auto sm:mx-0"></div>
          <div className="bg-base-300 animate-pulse h-4 rounded w-2/3 mx-auto sm:mx-0"></div>
        </div>
        <div className="w-32 h-32 mx-auto rounded-full bg-base-200 animate-pulse"></div>
      </div>
    </div>
    <div className="tabs mt-14">
      <div className="bg-base-100 animate-pulse h-8 w-20 rounded"></div>
      <div className="ml-1 bg-base-100 animate-pulse h-8 w-28 rounded"></div>
    </div>
    <TabContentLoading />
  </div>
)

export default SettingsPageLoading
