CREATE TABLE [dbo].[SeismicTable] (
    [Seismic_ID] INT            IDENTITY (1, 1) NOT NULL,
    [Seismic]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_SeismicTable] PRIMARY KEY CLUSTERED ([Seismic_ID] ASC)
);

